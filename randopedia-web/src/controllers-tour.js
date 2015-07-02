// Controllers

App.ToursController = Ember.ArrayController.extend();

App.TourController = Ember.ObjectController.extend({
    needs : ["login", "index"],

    actions: {
        viewTourOnMap: function() {
            this.get("controllers.index").send("viewTourOnMap", this.get("model"));
        },

        downloadGpxFile: function () {
            var saveSuccess = App.GeoHelper.saveAsGpx(this.get("mapGeoJson"), this.get("name"), this.get("itinerary"));
            if (!saveSuccess) {
                App.Alerts.showErrorMessage("Could not save gpx file. Most likely because your browser does not support the File API.");
            }
        },

        startAddReviewComment: function() {
            var comment = this.store.createRecord("comment");
            var loginController = this.get("controllers.login");
            var userId = loginController.get("currentUser").get("userId");
            var userName = loginController.get("currentUser").get("userName");
            comment.set("tour", this.get("model"));
            comment.set("userId", userId);
            comment.set("userName", userName);
            this.set("newComment", comment);
            this.set("addCommentMode", true);
        },
        
        cancelSaveReviewComment: function() {
            this.set("addCommentMode", false);
            this.set("newComment", null);
            this.set("newCommentText", null);
            this.set("commentError", null);
        },
        
        saveReviewComment: function() {
            if(this.get("havePendingOperations")){
                return;
            }
            if(!App.Validate.isNotNullOrEmpty(this.get("newCommentText"))){
                return;
            }
            var self = this;
            self.set("havePendingOperations", true);
            var newComment = self.get("newComment");
            newComment.set("comment", self.get("newCommentText"));
            newComment.save().then(
                function() {
                    //self.get("model").reload();
                    self.set("addCommentMode", false);
                    self.set("newComment", null);
                    self.set("newCommentText", null);
                    self.set("havePendingOperations", false);
                    App.Alerts.showSuccessMessage("Comment was added");
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.get("controllers.login").send("removeToken");
                        App.Alerts.showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again.");
                    }
                    else {
                        App.Alerts.showErrorMessage("Sorry, an error occured when saving the comment, please try again");
                    }
                    self.set("havePendingOperations", false);
                }
            );
        }
    },
    
    // Computed properties
    
    isPublished: function() {
        return this.get("status") === App.Fixtures.TourStatus.PUBLISHED;
    }.property("model.status"),
    
    isDraft: function() {
        return this.get("status") === App.Fixtures.TourStatus.DRAFT;
    }.property("model.status"),
    
    isInReview: function () {
        return this.get("status") === App.Fixtures.TourStatus.IN_REVIEW;
    }.property("model.status"),

    isDeleted: function() {
        return this.get("status") === App.Fixtures.TourStatus.DELETED;
    }.property("model.status"),

    hasImages: function(){
        if(!this.get("images")){
            return false;
        }
        return this.get("images").get("length") > 0;
    }.property("model.images.length"),

    hasMapData: function () {
        return App.GeoHelper.validateGeoJson(this.get("mapGeoJson"));
    }.property("model.mapGeoJson"),

    hasPaths: function() {
        return App.GeoHelper.geojsonContainsPath(this.get("mapGeoJson"));
    }.property("model.mapGeoJson"),
    
    checkIfIncomplete: function() {
        var warningCount = 0;
        if (!App.Validate.isNotNullOrEmpty(this.get("shortDescription"))) { warningCount++; }
        if (!this.get("grade")) { warningCount++; }
        if (!App.Validate.isPosNumber(this.get("elevationMax"))) { warningCount++; }
        if (!this.get("timeOfYearFrom")) { warningCount++; }
        if (!this.get("timeOfYearTo")) { warningCount++; }
        if (!App.GeoHelper.geojsonContainsPath(this.get("mapGeoJson"))) { warningCount++; }
        if (!App.GeoHelper.geojsonContainsSummitPoint(this.get("mapGeoJson"))) { warningCount++; }
        if (!App.Validate.lengthOrNull(this.get("itinerary"), 100, 8000, false)) { warningCount++; }
        this.set("isIncomplete", warningCount > 0);
    },
    
    haveNoHazards: function() {
        return !this.get("haveHazards");
    }.property("haveHazards"),

    doesNotRequireTools: function() {
        return !this.get("requiresTools");
    }.property("requiresTools"),
    
    markedItinerary: function() {
        if(!this.get("itinerary")){ 
            return null;
        }
        var linkedItinerary = this.get("itinerary").replace(/#(\S*)/g,"<a href=\"/#!/tags/$1\">#$1</a>");
        return marked(linkedItinerary);
    }.property("itinerary")
});

App.TourEditController = Ember.ObjectController.extend({
    needs: ["login"],
    validationErrors: [],
    validationWarnings: [],

    init: function() {
 
    },

    actions: {
        cancelEditTour: function () {
            var self = this;

            if (!self.get("model").get("id")) {
                
                self.get("model").deleteRecord();
                self.transitionToRoute("index");
            }
            else {                
                self.get("model").rollback();
                
                self.set("newImage", null);
                            
                self.transitionToRoute("tour", self.get("model"));
            }
        },
    
        publishTour: function () {
            var self = this;

            if (self.get("havePendingOperations")) {
                return;
            }
            
            if (!self.validateForPublish()) {
                App.Alerts.showErrorMessage("There are validation errors, please correct and try again.");
                return;
            }
            self.get("model").set("status", App.Fixtures.TourStatus.PUBLISHED);
            self.saveAndExit();
        },
    
        saveAsDraft: function () {
            var self = this;

            if(self.get("havePendingOperations")){
                return;
            }

            self.set("draftValidationErrors", false);
            
            if (!self.validateForDraft()) {
                App.Alerts.showErrorMessage("There are validation errors, area and name must be set before saving");
                return; 
            }
            self.get("model").set("status", App.Fixtures.TourStatus.DRAFT);
            self.saveAndExit();
        },

        sendToReview: function () {
            var self = this;

            if (self.get("havePendingOperations")) {
                return;
            }

            if (!self.validateForDraft()) {
                App.Alerts.showErrorMessage("There are validation errors, area and name must be set before saving");
                return;
            }
            self.get("model").set("status", App.Fixtures.TourStatus.IN_REVIEW);
            self.saveAndExit();
        },

        saveNewImage: function () {
            var self = this;

            if(self.get("havePendingOperations")){
                return;
            }
            
            self.set("havePendingOperations", true);
            var newImage = this.get("newImage");
            newImage.save().then(
                function() {
                   self.set("newImage", null);
                   self.set("havePendingOperations", false);

                   self.get("model").reload();
                   
                    App.Alerts.showSuccessMessage("Image was successfully added.", App.Alerts.long_delay);
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.get("controllers.login").send("removeToken");
                        App.Alerts.showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else if (status === 413) {
                        App.Alerts.showErrorMessage("Couldn't save the image, it's too big. Max image file size allowed is 12MB. ");
                    }
                    else {
                        App.Alerts.showErrorMessage("Sorry, an error occured when trying to save the image, please try again. ");
                    }

                    self.set("havePendingOperations", false);
                }
            );
        },
        
        removeNewImage: function() {
            this.set("newImage", null);
        },
        
        saveImage: function (image) {
            var self = this;

            if(self.get("havePendingOperations")){
                return;
            }
            
            self.set("havePendingOperations", true);
            image.save().then(
                function() {
                    self.get("model").reload();
                    self.set("havePendingOperations", false);
                    App.Alerts.showSuccessMessage("Image was successfully saved. ");
                }, 
                function(error) {
                    var status = error.status;
                    if (status === 403) {
                        self.get("controllers.login").send("removeToken");
                        App.Alerts.showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else {
                        App.Alerts.showErrorMessage("An error occured when saving the image, please try again. ");
                    }
                    self.set("havePendingOperations", false);
                }
            );
        },
        
        deleteImage: function(image) {
            var self = this;

            if (self.get("havePendingOperations")) {
                return;
            }
            
            self.set("havePendingOperations", true);
            image.deleteRecord();
            image.save().then(
                function() {
                    self.set("havePendingOperations", false);
                    App.Alerts.showSuccessMessage("Image was successfully deleted. ");
                },
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.get("controllers.login").send("removeToken");
                        App.Alerts.showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else {
                        App.Alerts.showErrorMessage("An error occured when deleting the image, please try again. ");
                    }
                    self.set("havePendingOperations", false);
               }
            );
        },
                
        // MAP ACTIONS
        
        updatePaths: function(geoJson) {
            this.set("model.mapGeoJson", geoJson);
        },
        
        deletePaths: function() {
            this.set("model.mapGeoJson", null);
        },
        
        updateGeoJson: function(geoJson) {
            this.set("model.mapGeoJson", geoJson);
        }
        
    },    
    saveAndExit: function () {
        console.log('save and exit!');
        var self = this;

        if (self.get("havePendingOperations")) {
            return;
        }

        self.set("havePendingOperations", true);
        
        self.get("model").save().then(
            function() {                           
                self.set("havePendingOperations", false);
                App.Alerts.showSuccessMessage("Tour was successfully saved");
                self.transitionToRoute("tour", self.get("model"));
            }, 
            function(error) {
                var status = error.status;
                if(status === 421) {
                    App.Alerts.showErrorMessage("Oh noes, there are validation errors, please try again. ");
                }
                else if(status === 403) {
                    self.get("controllers.login").send("removeToken");
                    App.Alerts.showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                }
                else {
                    App.Alerts.showErrorMessage("An error occured when saving the tour, please try again. ");
                }
                self.set("havePendingOperations", false);
            }
        );    
    },
    
    clearValidationFlags: function() {
        this.set("validationErrors", []);
        this.set("validationWarnings", []);
    },

    addImageForUpload: function(imageData) {
        var image = this.store.createRecord("image");
        image.set("imageData", imageData);
        image.set("tour", this.get("model"));
        this.set("newImage", image);
    },
    
    // Required fields when saving as draft are: name
    validateForDraft: function() {
        if(!App.Validate.name(this.get("name")) ||
           !App.Validate.shortDesc(this.get("shortDescription"), true) ||
           !App.Validate.mediumDesc(this.get("startingPoint"), true) ||
           !App.Validate.shortDesc(this.get("dangerDescription"), true) ||
           !App.Validate.shortDesc(this.get("mountaineeringSkillsDescription"), true) ||
           !App.Validate.longDesc(this.get("itinerary"), true) ||
           !App.Validate.isPosNumberOrNull(this.get("timingMin")) ||
           !App.Validate.isPosNumberOrNull(this.get("timingMax")) ||
           !App.Validate.isPosNumberOrNull(this.get("highestPoint")) ||
           !App.Validate.isPosNumberOrNull(this.get("heightDifferenceAscent")) ||
           !App.Validate.isPosNumberOrNull(this.get("heightDifferenceDescent")) ||
           !App.Validate.isPosNumberOrNull(this.get("degreesMax"))) {
               return false;
        }
        return true;
    },
    
    // Required fields when publishing are: name, starting point, itinerary, timingMin/Max, heightDifferenceAscent/Descent
    validateForPublish: function() {        
        this.set("validationErrors", []);
        
        if(!App.Validate.name(this.get("name"))){
            this.get("validationErrors").push("Name");
        }
        if(!App.Validate.shortDesc(this.get("shortDescription"), true)){
            this.get("validationErrors").push("Summary");
        }
        if(!App.Validate.mediumDesc(this.get("accessPoint"), false)){
            this.get("validationErrors").push("Access point");
        }
        if(!App.Validate.shortDesc(this.get("hazardsDescription"), true)){
            this.get("validationErrors").push("Hazards description");
        }
        if(!App.Validate.shortDesc(this.get("toolsDescription"), true)){
            this.get("validationErrors").push("Requires skills description");
        }
        if(!App.Validate.longDesc(this.get("itinerary"), false)){
            this.get("validationErrors").push("Description");
        }
        if(!App.Validate.isPosNumber(this.get("timingMin"))){
            this.get("validationErrors").push("Time min");
        }
        if(!App.Validate.isPosNumber(this.get("timingMax"))){
            this.get("validationErrors").push("Time max");
        }
        if(!App.Validate.isPosNumberOrNull(this.get("elevationMax"))){
            this.get("validationErrors").push("Highest point");
        }
        if(!App.Validate.isPosNumber(this.get("elevationGain"))){
            this.get("validationErrors").push("Elevation gain");
        }
        if(!App.Validate.isPosNumber(this.get("elevationLoss"))){
            this.get("validationErrors").push("Elevation loss");
        } 
        if(!App.Validate.isPosNumberOrNull(this.get("degreesMax"))) {
            this.get("validationErrors").push("Steepness");
        }
        
        return this.get("validationErrors").length === 0;
    },
    
    checkForValidationWarnings: function() {
        this.set("validationWarnings", []);
        
        if(!App.Validate.isNotNullOrEmpty(this.get("shortDescription"))){
            this.get("validationWarnings").push("Summary");
        }
        if(!this.get("grade")) {
            this.get("validationWarnings").push("Grade");
        }
        if(!App.Validate.isPosNumber(this.get("elevationMax"))) {
            this.get("validationWarnings").push("Highest point");
        }
        if(!this.get("timeOfYearFrom")) {
            this.get("validationWarnings").push("Season from");
        }
        if(!this.get("timeOfYearTo")) {
            this.get("validationWarnings").push("Season to");
        }
        if(!App.GeoHelper.geojsonContainsPath(this.get("mapGeoJson"))){
            this.get("validationWarnings").push("Map path");
        }
        if (!App.GeoHelper.geojsonContainsSummitPoint(this.get("mapGeoJson"))) {
            this.get("validationWarnings").push("Map summit point");
        }
        if(!App.Validate.lengthOrNull(this.get("itinerary"), 100, 8000, false)){
            this.get("validationWarnings").push("Description (very short)");
        }
        return this.get("validationWarnings").length > 0;
    },
    
    replaceHtmlChars: function() {
        if(!this.get("itinerary")){ return; }
    
        var str = this.get("itinerary").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.set("itinerary", str);
    },

    // Computed properties

    hasChanges: function() {
        if(this.get("isDirty") || this.get("hasNewImage")) {
            return true;
        }
        return false;
    }.property("isDirty", "newImage"),
    
    isStartPublishDisabled: function () {
        if (this.get("havePendingOperations")) {
            return true;
        }

        if(this.get("isDeleted")){
            return true;
        }

        if(!App.Validate.isNotNullOrEmpty(this.get("name"))){
            return true;
        }

        if(this.get("isDraft") || this.get("isInReview") || this.get("isDirty")) {
            return false;
        }
        
        return true;
    }.property("isDirty", "status", "name", "havePendingOperations"),
    
    isSaveAsDraftDisabled: function () {
        if(this.get("havePendingOperations")) {
            return true;
        }

        if(this.get("model").get("isNew")){
            return false;
        }

        if(!App.Validate.isNotNullOrEmpty(this.get("name"))){
            return true;
        }

        return !this.get("isDraft") || !this.get("hasChanges");
    }.property("model.status", "isDirty", "newImage", "model.name", "havePendingOperations"),

    isSendToReviewDisabled: function () {
        if (this.get("havePendingOperations")) {
            return true;
        }

        if(this.get("model").get("isNew")){
            return false;
        }

        if(!App.Validate.isNotNullOrEmpty(this.get("name"))){
            return true;
        }

        if (this.get("isDraft")) {
            return false;
        }
        
        return this.get("isInReview") && !this.get("hasChanges");
    }.property("model.status", "isDirty", "newImage", "model.name", "havePendingOperations"),

    isPublished: function() {
        return this.get("status") === App.Fixtures.TourStatus.PUBLISHED;
    }.property("model.status"),
    
    isDraft: function() {
        return this.get("status") === App.Fixtures.TourStatus.DRAFT;
    }.property("model.status"),

    isInReview: function () {
        return this.get("status") === App.Fixtures.TourStatus.IN_REVIEW;
    }.property("model.status"),
    
    isDeleted: function() {
        return this.get("status") === App.Fixtures.TourStatus.DELETED;
    }.property("model.status"),
    
    displayStatus: function() {
        switch (this.get("status")) {
            case App.Fixtures.TourStatus.PUBLISHED:
                return "Published";
            case App.Fixtures.TourStatus.DRAFT:
                return "Draft";
            case App.Fixtures.TourStatus.DELETED:
                return "Deleted";
            case App.Fixtures.TourStatus.IN_REVIEW:
                return "In review";
            default:
                return "Undefined";
        }
    }.property("model.status"),

    hasImages: function(){
        if(!this.get("images")){
            return false;
        }
        return this.get("images").get("length") > 0;
    }.property("model.images.length"),
    
    hasNewImage: function() {
        if(!this.get("newImage")){
          return false;  
        }
        return true;
    }.property("newImage"),

    hasPaths: function() {
        if(!this.get("mapGeoJson")){
           return false;
        }
        return true;
    }.property("model.mapGeoJson"),
    
    isIncomplete: function() {
        if (this.get("isDraft")) {
             return false;
        }
        return this.checkForValidationWarnings() > 0;
    }.property("name"),
    
    haveNoHazards: function() {
        return !this.get("haveHazards");
    }.property("haveHazards"),

    doesNotRequireTools: function() {
        return !this.get("requiresTools");
    }.property("requiresTools")
});

App.MytoursController = Ember.ObjectController.extend({
    needs: "login",
    user: null,
    drafts: [],
    updates: [],
    reviews: [],
    isLoadingDrafts: false,
    isLoadingUpdates: false,
    isLoadingReviews: false,

    init: function () {
        var self = this;
        self.user = this.get("controllers.login").get("currentUser");
        self.set("isLoadingDrafts", true);
        self.set("isLoadingUpdates", true);
        self.set("isLoadingReviews", true);

        self.store.findQuery("tour", { status: App.Fixtures.TourStatus.DRAFT }).then(function (tours) {
            self.set("drafts", tours);
            self.set("isLoadingDrafts", false);
        }, function() {
            self.set("isLoadingDrafts", false);
            App.Alerts.showErrorMessage("An error occured when loading drafts, are you logged in?");
        });

        self.store.findQuery("tour", { usersTours: true }).then(function (tours) {
            self.set("updates", tours);
            self.set("isLoadingUpdates", false);
        }, function () {
            self.set("isLoadingUpdates", false);
            App.Alerts.showErrorMessage("An error occured when loading tours, are you logged in?");
        });

        self.store.findQuery("tour", { status: App.Fixtures.TourStatus.IN_REVIEW }).then(function (tours) {
            self.set("reviews", tours);
            self.set("isLoadingReviews", false);
        }, function () {
            self.set("isLoadingReviews", false);
            App.Alerts.showErrorMessage("An error occured when loading tours in review, are you logged in?");
        });
    }
});
