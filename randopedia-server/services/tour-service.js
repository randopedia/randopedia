var tourRepository = require("../repositories/tour-repository");
var tourActionRepository = require("../repositories/tour-action-repository");
var tourReviewCommentRepository = require("../repositories/tour-reviewcomment-repository");
var dataWasher = require("../helpers/data-washer");
var dataValidator = require("../helpers/data-validator");
var common = require("../helpers/common");
var enums = require("../enums");
var Q = require('q');

var tourService = (function () {

    function isTourPublishedWhenCreated(tour) {
        return tour.status === enums.TourStatus.PUBLISHED;
    }

    function isTourSentToReview(originalTour, tour) {
        return originalTour.status === enums.TourStatus.DRAFT && tour.status === enums.TourStatus.IN_REVIEW;
    }

    function isTourPublishedForTheFirstTime(originalTour, tour) {
        return (originalTour.status == enums.TourStatus.DRAFT && tour.status === enums.TourStatus.PUBLISHED) || (originalTour.status === enums.TourStatus.IN_REVIEW && tour.status === enums.TourStatus.PUBLISHED);
    }
    
    function execCallback(param, callback) {
        if (callback) {
            callback(param);
        }
    }    

    function getTour(tourId, req, callback) {
        tourRepository.getTour(tourId, req).then(function (tour) {
            if (callback) {
                callback(tour);
            }
            
        }).catch(function (error) {
            console.log(error);
        });
    }

    function getTours(status, user, req, callback) {
        if (status === enums.TourStatus.DRAFT.toString()) {
            if(!user) {
                execCallback([], callback);
            }
            
            tourRepository.getTourDrafts(user._id.toString(), req).then(function (tours) {
                execCallback(tours, callback);

            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            tourRepository.getTours(status, req).then(function (tours) {
                execCallback(tours, callback);

            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    function getToursForUser(user, req, callback) {
        if(!user) {
            execCallback([], callback);
        }
        
        tourRepository.getToursForUser(user._id.toString(), req).then(function (tours) {
            execCallback(tours, callback);

        }).catch(function (error) {
            console.log(error);
        });
    }

    function getToursByQuery(query, req, callback) {

        var queryPromise = tourRepository.getToursByQuery(query, req);
        var tagsPromise = tourRepository.getToursWithTagRegex(query, req);
        var allPromises = Q.all([queryPromise, tagsPromise]);

        allPromises.spread(function(queryResults, tagsResults) {
            var tours = {};
            if(queryResults) {
                queryResults.forEach(function(tour) {
                    tours[tour.clientId] = tour;
                });
            }
            if(tagsResults) {
                tagsResults.forEach(function(tour) {
                    tours[tour.clientId] = tour;
                });
            }
            var toursArray = Object.keys(tours).map(function(key) {
                return tours[key];
            });
            execCallback(toursArray, callback);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function createTour(tour, user, req, callback, validationErrorsCallback) {

        tour = dataWasher.washTour(tour);

        var validationErrors = dataValidator.validateTour(tour);
        if (validationErrors.length > 0) {
            if (validationErrorsCallback) {
                validationErrorsCallback(validationErrors);
            }
            return;
        }   
    
        tour.tags = common.mergeTags(tour.tags, tour.itinerary);
        
        tourRepository.saveTour(tour, req).then(function (createdTour) {

            tourActionRepository.save(user, createdTour, enums.TourActionType.CREATE, req);

            if (isTourPublishedWhenCreated(createdTour)) {
                tourActionRepository.save(user, createdTour, enums.TourActionType.PUBLISH, tour.publishComment, req);
            }

            if (callback) {
                callback(createdTour);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function updateTour(tour, user, req, callback, validationErrorsCallback) {
        tour = dataWasher.washTour(tour);
        var validationErrors = dataValidator.validateTour(tour);
        if (validationErrors.length > 0) {
            if (validationErrorsCallback) {
                validationErrorsCallback(validationErrors);
            }
            return;
        }

        tour.tags = common.mergeTags(tour.tags, tour.itinerary);

        tourRepository.getTour(tour.id, req).then(function (data) {
            var originalTour = data.tour;
            tourRepository.saveTour(tour, req).then(function (updatedTour) {
                tourActionRepository.save(user, updatedTour, enums.TourActionType.UPDATE, req, tour.publishComment);

                if (isTourSentToReview(originalTour, tour)) {
                    tourActionRepository.save(user, updatedTour, enums.TourActionType.SENT_TO_REVIEW, req, "Sent to review");

                } else if (isTourPublishedForTheFirstTime(originalTour, tour)) {
                    tourActionRepository.save(user, updatedTour, enums.TourActionType.PUBLISH, req, "First published");
                }

                if (callback) {
                    callback(updatedTour);
                }

            });

        }).catch(function (error) {
            console.log(error);
        });
    }

    function getActions(ids, callback) {
        if (!ids || ids.length === 0) {
            return [];
        }

        tourActionRepository.getActions(ids).then(function (actions) {
            if (callback) {
                callback(actions);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function addImage(image, user, req, callback) {

        tourRepository.addImage(image.tour, image, req).then(function (addedImage) {

            tourActionRepository.saveImageAction(user, addedImage, enums.TourActionType.IMAGE_CREATE, req);

            if (callback) {
                callback(addedImage);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function updateImage(image, imageId, user, req, callback) {

        tourRepository.updateImage(image, imageId, req).then(function (updatedImage) {
            
            tourActionRepository.saveImageAction(user, updatedImage, enums.TourActionType.IMAGE_UPDATE, req);

            if (callback) {
                callback(updatedImage);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function deleteImage(imageId, user, req, callback) {

        tourRepository.getTourFromImageId(imageId, req).then(function(tourFromImageId) {
            
            tourRepository.deleteImage(imageId, req).then(function () {
                
                tourActionRepository.saveDeleteImageAction(user, tourFromImageId.clientId, imageId, req);

                if (callback) {
                    callback();
                }
        
            });
            
        }).catch(function (error) {
            console.log(error);
        });

    }
    
    function addReviewComment(comment, callback) {
        tourReviewCommentRepository.save(comment).then(function (createdComment) {

            if (callback) {
                callback(createdComment);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }
    
    function getReviewComments(ids, callback) {

        tourActionRepository.getReviewComments(ids).then(function (actions) {
            if (callback) {
                callback(actions);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    return {
        getTour: getTour,
        getTours: getTours,
        getToursByQuery: getToursByQuery,
        getToursForUser: getToursForUser,
        createTour: createTour,
        updateTour: updateTour,
        getActions: getActions,
        addImage: addImage,
        updateImage: updateImage,
        deleteImage: deleteImage,
        addReviewComment: addReviewComment,
        getReviewComments: getReviewComments
    };

})();

module.exports = tourService; 
