var mongoose = require("mongoose");
var Q = require("q");
var fs = require('fs');
var config = require("../config/config")
var Tour = require("../models/tour");
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
            return { tours: [] };
        }

        var entities = [];
        documents.forEach(function (doc) {
            entities.push(documentToTour(doc));
        }, this);

        return { tourItems: entities };
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
        var uniqueClientId = common.getTextId(tourName);
        var counter = currentCounter ? currentCounter : 1;

        return getTour(tourName).then(function (tour) {
            if (!tour) {
                return uniqueClientId;
            }

            uniqueClientId = uniqueClientId + "_" + counter;
            counter++;
            return findUniqueClientId(uniqueClientId, counter);

        }).catch(function (error) {
            console.log(error);
        });
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

    function getToursByStatus(status) {
        var deferred = Q.defer();

        Tour.find({ status: status }, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });
        return deferred.promise;
    }

    function getTourDrafts() {
        // todo: ...
    }

    function getTourItems() {
        var itemFields = "mapGeoJson name grade elevationLoss elevationGain timingMin timingMax shortDescription clientId";
        var deferred = Q.defer();

        Tour.find({ status: enums.TourStatus.PUBLISHED }, itemFields, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });

        return deferred.promise;
    }

    function saveTour(tour) {
        var deferred = Q.defer();

        if (!tour.id) {
            tour.clientId = findUniqueClientId(tour.name);

            Tour.create(tour, function (err, result) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(documentToTour(result));
                }
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

            fs.unlink(config.webappClientDirectory + "/" + tour.tourImages[index].imageFile, function(err) {
                if(err) {
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
            getToursWithTag: getToursWithTag,
            getToursByStatus: getToursByStatus,
            getTourDrafts: getTourDrafts,
            getTourItems: getTourItems,
            saveTour: saveTour,
            addImage: addImage,
            updateImage: updateImage,
            deleteImage: deleteImage
        };

    })();

    module.exports = tourRepository; 
