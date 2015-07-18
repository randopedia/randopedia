var mongoose = require("mongoose");
var Q = require("q");
var fs = require('fs');
var config = require("../config/config");
var Tour = require("../models/tour");
var TourAction = require("../models/tour-action");
var common = require("../helpers/common");
var enums = require("../enums");

var tourRepository = (function () {

    function documentToTour(doc) {
        var tour = doc.toObject();
        tour.id = tour.clientId;
        return tour;
    }

    function documentsToTours(documents) {
        if (!documents || documents.length === 0) {
            return [];
        }

        var tours = [];
        documents.forEach(function (doc) {
            tours.push(documentToTour(doc));
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

    function findUniqueClientId(tourName, currentCounter) {
        var deferred = Q.defer();

        var uniqueClientId = common.getTextId(tourName);
        var counter = currentCounter ? currentCounter : 1;

        Tour.findOne({ clientId: tourName }, function (err, result) {
            if (err) {
                deferred.reject(err);

            } else {
                if (!result) {
                    deferred.resolve(uniqueClientId);
                    return;
                }

                uniqueClientId = uniqueClientId + "_" + counter;
                counter++;
                return findUniqueClientId(uniqueClientId, counter);
            }
        });

        return deferred.promise;
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
    
    function getTour(tourId) {
        var deferred = Q.defer();

        Tour.findOne({ clientId: tourId }, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                if (result) {
                    var tour = documentToTour(result);
                    var tourImages = tour.tourImages;
                    if (tourImages) {
                        var images = getImageIdArrayFromTourImages(tourImages);
                        tourImages = getTourImagesWithIds(tourImages);
                        delete tour.tourImages;
                        tour.images = images;
                    }
                    deferred.resolve({ tour: tour, images: tourImages });
                } else {
                    deferred.resolve(null);
                }
            }
        });

        return deferred.promise;
    }

    function getTours(status) {
        var deferred = Q.defer();

        status = !status ? enums.TourStatus.PUBLISHED : status;

        Tour.find({ status: status }, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });

        return deferred.promise;
    }

    function getTourItems(status) {
        var itemFields = "mapGeoJson name grade elevationLoss elevationGain timingMin timingMax shortDescription clientId";
        var deferred = Q.defer();

        status = !status ? enums.TourStatus.PUBLISHED : status;

        Tour.find({ status: status }, itemFields, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });

        return deferred.promise;
    }

    function getToursByQuery(query) {
        var re = new RegExp(query, 'i');
        var deferred = Q.defer();

        Tour.find({ 'name': { $regex: re } }, function (err, result) {
            if (err) {
                deferred.reject();
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });
        return deferred.promise;
    }

    function getToursWithTag(tagName) {
        var deferred = Q.defer();

        Tour.find({ tags: tagName }, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });
        return deferred.promise;
    };

    function getTourDrafts(userId) {
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
                        
                Tour.find({ _id: { $in: tourIds }, status: enums.TourStatus.DRAFT }, function (err, tours) {

                    if (err) {
                        deferred.reject(err);

                    } else {
                        deferred.resolve(documentsToTours(tours));
                    }
                });
            }
        });

        return deferred.promise;
    }

    /*
    *  Get all tours that the specified user have collaborated on (drafts not included)
    */
    function getToursForUser(userId) {
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

                Tour.find({ _id: { $in: tourIds }, status: { $ne: enums.TourStatus.DRAFT } }, function (err, tours) {

                    if (err) {
                        deferred.reject(err);

                    } else {
                        deferred.resolve(documentsToTours(tours));
                    }
                });
            }
        });

        return deferred.promise;
    }

    function saveTour(tour) {
        var deferred = Q.defer();

        if (!tour.id) {
            findUniqueClientId(tour.name).then(function (clientId) {
                tour.clientId = clientId;
                Tour.create(tour, function (err, result) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(documentToTour(result));
                    }
                });
            });

        } else {
            Tour.findOneAndUpdate({ clientId: tour.id }, tour, function (err, result) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(documentToTour(result));
                }
            });
        }

        return deferred.promise;
    }

    function addImage(tourId, image) {
        var deferred = Q.defer();
        var imageId = mongoose.Types.ObjectId();
        var databaseFileName = config.tourImagesDirectory + "/" + tourId + "_" + imageId + ".jpg";
        var fileName = config.webappClientDirectory + "/" + databaseFileName;

        var imageBuffer = common.decodeBase64Image(image.imageData);

        fs.writeFile(fileName, imageBuffer.data, function (err) {
            if (err) {
                deferred.reject(err);
                return;
            }

            image._id = imageId;
            image.tour = tourId;
            image.imageFile = databaseFileName;
            image.imageData = null;

            Tour.findOne({ clientId: tourId }, function (err, result) {
                if (err) {
                    deferred.reject(err);
                    return;
                }

                if (!result) {
                    deferred.reject("Couldn't find tour");
                    return;
                }

                var tour = documentToTour(result);
                if (!tour.tourImages) {
                    tour.tourImages = [];
                }
                tour.tourImages.push(image);

                saveTour(tour).then(function () {
                    deferred.resolve();

                }).catch(function (error) {
                    console.log(error);
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

    function updateImage(image, imageId) {
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

            var tour = documentToTour(result);

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

            saveTour(tour).then(function () {
                deferred.resolve(image);

            }).catch(function (error) {
                console.log(error);
            });
        });

        return deferred.promise;
    }

    function deleteImage(imageId) {
        var deferred = Q.defer();

        var id = mongoose.Types.ObjectId(imageId);
        Tour.findOne({ "tourImages._id": id }, function (err, result) {
            if (err) {
                deferred.reject(err);
                return;
            }

            if (!result) {
                deferred.reject("Couldn't find tour for image");
                return;
            }

            var tour = documentToTour(result);

            if (!tour.tourImages) {
                deferred.reject("Tour has no images, cannot delete");
                return;
            }

            var index = findIndexFromId(tour.tourImages, imageId);
            if (index < 0) {
                deferred.reject("Image does not exist, cannot update");
                return;
            }

            fs.unlink(config.webappClientDirectory + "/" + tour.tourImages[index].imageFile, function (err) {
                if (err) {
                    deferred.reject("Error wwhen deleting image file");
                    throw err;
                };

                tour.tourImages.splice(index, 1);

                saveTour(tour).then(function () {
                    deferred.resolve();

                }).catch(function (error) {
                    console.log(error);
                });
            });
        });

        return deferred.promise;
    }

    return {
        getTour: getTour,
        getTours: getTours,
        getTourItems: getTourItems,
        getToursWithTag: getToursWithTag,
        getToursByQuery: getToursByQuery,
        getTourDrafts: getTourDrafts,
        getToursForUser: getToursForUser,
        saveTour: saveTour,
        addImage: addImage,
        updateImage: updateImage,
        deleteImage: deleteImage
    };

})();

module.exports = tourRepository; 
