var tourRepository = require("../repositories/tour-repository");
var tourActionRepository = require("../repositories/tour-action-repository");
var dataWasher = require("../helpers/data-washer");
var dataValidator = require("../helpers/data-validator");
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

    function getTour(tourId, callback) {
        tourRepository.getTour(tourId).then(function (tour) {
            if (callback) {
                callback(tour);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    function getTours(status, user, callback) {
        if (status === enums.TourStatus.DRAFT.toString()) {
            if(!user) {
                execCallback([], callback);
            }
            
            tourRepository.getTourDrafts(user._id.toString()).then(function (tours) {
                execCallback(tours, callback);

            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            tourRepository.getTours(status).then(function (tours) {
                execCallback(tours, callback);

            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    function getToursForUser(user, callback) {
        if(!user) {
            execCallback([], callback);
        }
        
        tourRepository.getToursForUser(user._id.toString()).then(function (tours) {
            execCallback(tours, callback);

        }).catch(function (error) {
            console.log(error);
        });
    }

    function getToursByQuery(query, callback) {

        var queryPromise = tourRepository.getToursByQuery(query);
        var tagsPromise = tourRepository.getToursWithTagRegex(query);
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

    function getTourItems(callback) {
        tourRepository.getTourItems().then(function (tourItems) {
            execCallback(tourItems, callback);

        }).catch(function (error) {
            console.log(error);
        });
    }

    function createTour(tour, user, callback, validationErrorsCallback) {

        tour = dataWasher.washTour(tour);

        var validationErrors = dataValidator.validateTour(tour);
        if (validationErrors.length > 0) {
            if (validationErrorsCallback) {
                validationErrorsCallback(validationErrors);
            }
            return;
        }   
    
        // todo: get tags from itinerary and save ?
        
        tourRepository.saveTour(tour).then(function (tour) {

            tourActionRepository.save(user, tour, enums.TourActionType.CREATE);

            if (isTourPublishedWhenCreated(tour)) {
                tourActionRepository.save(user, tour, enums.TourActionType.PUBLISH);
            }

            if (callback) {
                callback(tour);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function updateTour(tour, user, callback, validationErrorsCallback) {

        tour = dataWasher.washTour(tour);
        var validationErrors = dataValidator.validateTour(tour);
        if (validationErrors.length > 0) {
            if (validationErrorsCallback) {
                validationErrorsCallback(validationErrors);
            }
            return;
        }

        // todo: get tags from itinerary and save ?
        
        tourRepository.getTour(tour.id).then(function (data) {

            tourRepository.saveTour(tour).then(function (updatedTour) {

                tourActionRepository.save(user, data.tour, enums.TourActionType.UPDATE);

                if (isTourSentToReview(data.tour, tour)) {
                    tourActionRepository.save(user, data.tour, enums.TourActionType.SENT_TO_REVIEW);

                } else if (isTourPublishedForTheFirstTime(data.tour, tour)) {
                    tourActionRepository.save(user, data.tour, enums.TourActionType.PUBLISH);
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

    function addImage(image, user, callback) {

        tourRepository.addImage(image.tour, image).then(function () {

            if (callback) {
                callback();
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function updateImage(image, imageId, user, callback) {

        tourRepository.updateImage(image, imageId).then(function (image) {

            if (callback) {
                callback(image);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    function deleteImage(imageId, user, callback) {

        tourRepository.deleteImage(imageId).then(function () {

            if (callback) {
                callback();
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    return {
        getTour: getTour,
        getTours: getTours,
        getTourItems: getTourItems,
        getToursByQuery: getToursByQuery,
        getToursForUser: getToursForUser,
        createTour: createTour,
        updateTour: updateTour,
        getActions: getActions,
        addImage: addImage,
        updateImage: updateImage,
        deleteImage: deleteImage
    };

})();

module.exports = tourService; 
