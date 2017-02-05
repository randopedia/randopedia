var mongoose = require("mongoose");
var Q = require("q");
var fs = require('fs');
var config = require("../config/config");
var Tour = require("../models/tour");
var Stat = require("../models/stat");
var TourAction = require("../models/tour-action");
var common = require("../helpers/common");
var enums = require("../enums");

var tourItemFields = "mapGeoJson name grade elevationLoss elevationGain timingMin timingMax elevationMax clientId";

var tourRepository = (function () {

    function documentToTour(doc, req) {
        if(!doc) {
            return null;
        }
        var tour = doc.toObject();
        tour.id = tour.clientId;

        if(tour.itinerary) {
            tour.itineraryEng = tour.itinerary.eng;
            tour.itineraryNo = tour.itinerary.no;
        }
        if(tour.accessPoint) {
            tour.accessPointEng = tour.accessPoint.eng;
            tour.accessPointNo = tour.accessPoint.no;
        }
        if(tour.hazardsDescription) {
            tour.hazardsDescriptionEng = tour.hazardsDescription.eng;
            tour.hazardsDescriptionNo = tour.hazardsDescription.no;
        }
        if(tour.toolsDescription) {
            tour.toolsDescriptionEng = tour.toolsDescription.eng;
            tour.toolsDescriptionNo = tour.toolsDescription.no;
        }

        return tour;
    }

    function documentsToTours(documents, req) {
        if (!documents || documents.length === 0) {
            return [];
        }

        var tours = [];
        documents.forEach(function (doc) {
            tours.push(documentToTour(doc, req));
        });

        return tours;
    }

    function getImageIdArrayFromTourImages(tourImages) {
        return tourImages.map(function (image) {
            return image._id;
        });
    }

    function getTourImagesWithIds(tourImages) {
        return tourImages.map(function (tourImage) {
            var imageWithId = tourImage;
            imageWithId.id = tourImage._id;
            return imageWithId;
        });
    }

    function getDistinctTourIds(actions) {
        var tourIds = [];
        actions.forEach(function (action) {
            var actionObj = action.toObject();
            if (-1 === tourIds.indexOf(actionObj.tourId)) {
                tourIds.push(actionObj.tourId);
            }
        });

        return tourIds;
    }

    function getTour(tourClientId, req, excludeImages) {
        var deferred = Q.defer();
        Tour.findOne({ clientId: tourClientId }, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                if (result) {
                    var tour = documentToTour(result, req);
                    var tourImages = tour.tourImages;
                    if (tourImages) {
                        var images = getImageIdArrayFromTourImages(tourImages);
                        tourImages = getTourImagesWithIds(tourImages);
                        delete tour.tourImages;
                        tour.images = images;
                    }

                    var retVal = excludeImages ? tour : { tour: tour, images: tourImages };
                    deferred.resolve(retVal);

                } else {
                    deferred.resolve(null);
                }
            }
        });

        return deferred.promise;
    }

    /*
    *  Returns TourItems
    */
    function getTours(status, req) {
        var deferred = Q.defer();

        status = !status ? enums.TourStatus.PUBLISHED : status;
        if(enums.TourStatus.LAST_UPDATED.toString() === status) {
            Tour.find({ status : enums.TourStatus.PUBLISHED} , tourItemFields, function (err, result) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(documentsToTours(result, req));
                }
            }).sort({updatedStamp : 'desc'}).limit(5);
        } else {
            Tour.find({ status: status }, tourItemFields, function (err, result) {
                if (err) {
                    console.log('Could not get tours from db: ' + err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(documentsToTours(result, req));
                }
            });
        }

        return deferred.promise;
    }

    /*
    *  Returns TourItems
    */
    function getToursByQuery(query, req) {
        var re = new RegExp(query, 'i');
        var deferred = Q.defer();

        Tour.find({ 'name': { $regex: re } }, tourItemFields, function (err, result) {
            if (err) {
                deferred.reject();
            } else {
                deferred.resolve(documentsToTours(result, req));
            }
        });
        return deferred.promise;
    }

    /*
    *  Returns TourItems
    */
    function getToursWithTagRegex(tagRegex, req) {
        var deferred = Q.defer();

        var searchRegex = tagRegex.toLowerCase();

        Tour.find({ tags : { $regex : searchRegex } }, tourItemFields, function(err, tours) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(tours, req));
            }
        });

        return deferred.promise;
    }

    /*
    *  Returns TourItems
    */
    function getToursWithTag(tagName, req) {
        var deferred = Q.defer();
        Tour.find({ tags: tagName }, tourItemFields, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(result);
                deferred.resolve(documentsToTours(result, req));
            }
        });
        return deferred.promise;
    };

    /*
    *  Get all tours with status draft for the specified user
    *  Returns TourItems
    */
    function getTourDrafts(userId, req) {
        var deferred = Q.defer();

        TourAction.find({ userId: userId }, function (err, actions) {
            if (err) {
                deferred.reject(err);

            } else {

                if (actions.length === 0) {
                    deferred.resolve([]);
                    return;
                };

                var tourIds = getDistinctTourIds(actions);

                Tour.find({ _id: { $in: tourIds }, status: enums.TourStatus.DRAFT }, tourItemFields, function (err, tours) {

                    if (err) {
                        deferred.reject(err);

                    } else {
                        deferred.resolve(documentsToTours(tours, req));
                    }
                });
            }
        });

        return deferred.promise;
    }

    /*
    *  Get all tours that the specified user have collaborated on (excluding drafts)
    *  Returns TourItems
    */
    function getToursForUser(userId, req) {
        var deferred = Q.defer();

        TourAction.find({ userId: userId }, function (err, actions) {
            if (err) {
                deferred.reject(err);

            } else {

                if (actions.length === 0) {
                    deferred.resolve([]);
                    return;
                };

                var tourIds = getDistinctTourIds(actions);

                Tour.find({ _id: { $in: tourIds }, status: { $ne: enums.TourStatus.DRAFT } }, tourItemFields, function (err, tours) {

                    if (err) {
                        deferred.reject(err);

                    } else {
                        deferred.resolve(documentsToTours(tours, req));
                    }
                });
            }
        });

        return deferred.promise;
    }

    function setNewTourLanguageSpecificData(tour) {
        var itinerary = {};
        var accessPoint = {};
        var hazardsDescription = {};
        var toolsDescription = {};

        itinerary.eng = tour.itineraryEng;
        itinerary.no = tour.itineraryNo;
        
        accessPoint.eng = tour.accessPointEng;
        accessPoint.no = tour.accessPointNo;
        
        hazardsDescription.eng = tour.hazardsDescriptionEng;
        hazardsDescription.no = tour.hazardsDescriptionNo;

        toolsDescription.eng = tour.toolsDescriptionEng;
        toolsDescription.no = tour.toolsDescriptionNo;

        tour.itinerary = itinerary;
        tour.accessPoint = accessPoint;
        tour.hazardsDescription = hazardsDescription;
        tour.toolsDescription = toolsDescription;
    }

    function updateTourLanguageSpecificData(existingTour, tour, lang) {
        var itinerary = existingTour.itinerary || {};
        var accessPoint = existingTour.accessPoint || {};
        var hazardsDescription = existingTour.hazardsDescription  || {};
        var toolsDescription = existingTour.toolsDescription || {};

        itinerary.eng = tour.itineraryEng;
        itinerary.no = tour.itineraryNo;
        
        accessPoint.eng = tour.accessPointEng;
        accessPoint.no = tour.accessPointNo;
        
        hazardsDescription.eng = tour.hazardsDescriptionEng;
        hazardsDescription.no = tour.hazardsDescriptionNo;

        toolsDescription.eng = tour.toolsDescriptionEng;
        toolsDescription.no = tour.toolsDescriptionNo;

        tour.itinerary = itinerary;
        tour.accessPoint = accessPoint;
        tour.hazardsDescription = hazardsDescription;
        tour.toolsDescription = toolsDescription;
    }

    function saveTour(tour, req) {
        var deferred = Q.defer();
        tour.updatedStamp = new Date();
        if (!tour.id) {
            var clientId = common.getTextId(tour.name);
            var startsWithRegex = new RegExp("^" + clientId, "i");

            Tour.find({ clientId: {$regex: startsWithRegex}}, function (err, result) {
                if (err) {
                    deferred.reject(err);

                } else {

                    setNewTourLanguageSpecificData(tour);

                    if(result.length > 0) {
                        tour.clientId = clientId + "_" + result.length;
                    } else {
                        tour.clientId = clientId;
                    }

                    Tour.create(tour, function(createErr, createdTour) {
                        if(createErr) {
                            deferred.reject(createErr);
                        } else {
                            deferred.resolve(documentToTour(createdTour, req));
                        }
                   });
                }
            });

        } else {
            Tour.findOne({clientId : tour.id}, function(err, result) {
                var existingTour = result.toObject();
                
                updateTourLanguageSpecificData(existingTour, tour);

                Tour.findOneAndUpdate({ clientId: tour.id }, tour, {'new': true}, function (err, result) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(documentToTour(result, req));
                    }
                });
            });
        }

        return deferred.promise;
    }

    function addImage(tourClientId, image, req) {
        var deferred = Q.defer();
        var imageId = mongoose.Types.ObjectId();
        var databaseFileName = "/" + config.tourImagesDirectory + "/" + tourClientId + "_" + imageId + ".jpg";
        var fileName = config.webappClientDirectory  + databaseFileName;

        var imageBuffer = common.decodeBase64Image(image.imageData);

        fs.writeFile(fileName, imageBuffer.data, function (err) {
            if (err) {
                deferred.reject(err);
                return;
            }

            image._id = imageId;
            image.imageFile = databaseFileName;
            image.imageData = null;

            Tour.findOne({ clientId: tourClientId }, function (err, result) {
                if (err) {
                    deferred.reject(err);
                    return;
                }

                if (!result) {
                    deferred.reject("Couldn't find tour");
                    return;
                }

                var tour = documentToTour(result, req);
                image.tour = tour._id.toString();

                if (!tour.tourImages) {
                    tour.tourImages = [];
                }
                tour.tourImages.push(image);

                saveTour(tour, req).then(function () {
                    image.tour = tour.clientId;
                    deferred.resolve(image);

                }).catch(function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
            });
        });

        return deferred.promise;
    }

    function findIndexFromId(array, id) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            var j = array[i]._id.toString();
            if (array[i]._id.toString() === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    function updateImage(image, imageId, req) {
        var deferred = Q.defer();

        Tour.findOne({ clientId: image.tour }, function (err, result) {
            if (err) {
                deferred.reject(err);
                return;
            }

            if (!result) {
                deferred.reject("Couldn't find tour for image");
                return;
            }

            var tour = documentToTour(result, req);

            if (!tour.tourImages) {
                deferred.reject("Image does not exist, cannot update");
                return;
            }

            image._id = mongoose.Types.ObjectId(imageId);

            var index = findIndexFromId(tour.tourImages, imageId);
            if (index < 0) {
                deferred.reject("Image does not exist, cannot update");
                return;
            }

            if (image.isPortfolio) {
                tour.tourImages.forEach(function (element) {
                    element.isPortfolio = false;
                });
                tour.portfolioImage = image.id;
                var imgs = [];
                imgs.push(image);
                tour.tourImages.forEach(function (element) {
                    if (element._id.toString() !== image._id.toString()) {
                        imgs.push(element);
                    }
                });
                tour.tourImages = imgs;

            } else {
                tour.tourImages[index] = image;
            }

            saveTour(tour, req).then(function () {
                deferred.resolve(image);

            }).catch(function (error) {
                console.log(error);
                deferred.reject(error);
            });
        });

        return deferred.promise;
    }

    function deleteImage(imageId, req) {
        var deferred = Q.defer();

        getTourFromImageId(imageId, req).then(function(tour) {

            var index = findIndexFromId(tour.tourImages, imageId);
            if (index < 0) {
                deferred.reject("Image does not exist");
                return;
            }

            fs.unlink(config.webappClientDirectory + "/" + tour.tourImages[index].imageFile, function (err) {
                if (err) {
                    console.log(err);
                    deferred.reject("Error when deleting image file");
                    return;
                };

                tour.tourImages.splice(index, 1);

                saveTour(tour, req).then(function () {
                    deferred.resolve();

                }).catch(function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
            });
        });

        return deferred.promise;
    }

    function getTourFromImageId(imageId, req) {
        var deferred = Q.defer();

        var id = mongoose.Types.ObjectId(imageId);

        Tour.findOne({ "tourImages._id": id }, function (err, result) {
            if (err) {
                deferred.reject(err);
                return;
            }

            if (!result) {
                deferred.reject("Couldn't find tour from image id " + imageId);
                return;
            }

            var tour = documentToTour(result, req);

            if (!tour.tourImages) {
                deferred.reject("Tour has no images. Invalid tour id on image.");
                return;
            }

            deferred.resolve(tour);
        });

        return deferred.promise;
    }

    function getTourCount(status) {
        var deferred = Q.defer();

        if(!status) {
            status = enums.TourStatus.PUBLISHED;
        }

        Tour.count({status: status}, function(err, count) {
            if (err) {
                deferred.reject(err);
                return;
            }

            deferred.resolve(count);
        });

        return deferred.promise;
    }

    function getTourStats() {
        var deferred = Q.defer();

        Stat.findOne({clientId : 'randostats'}, function(err, result) {
            if(err) {
                deferred.reject(err);
                return;
            }

            deferred.resolve(result);
        });
        return deferred.promise;
    }

    return {
        getTour: getTour,
        getTours: getTours,
        getToursWithTag: getToursWithTag,
        getToursWithTagRegex : getToursWithTagRegex,
        getToursByQuery: getToursByQuery,
        getTourDrafts: getTourDrafts,
        getToursForUser: getToursForUser,
        saveTour: saveTour,
        addImage: addImage,
        updateImage: updateImage,
        deleteImage: deleteImage,
        getTourFromImageId: getTourFromImageId,
        getTourCount: getTourCount,
        getTourStats : getTourStats
    };

})();

module.exports = tourRepository;
