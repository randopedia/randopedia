import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Component.extend({
    login: Ember.inject.service(),
    language: Ember.inject.service(),
    alert: Ember.inject.service(),

    showAdvancedOptions: false,
    haveValidationErrors: false,
    haveValidationWarnings: false,
    validationErrors: [],
    validationWarnings: [],
    allTags: null,
    
    didInsertElement: function() {
        $('a[data-toggle="pill"]').on('shown.bs.tab', function () {
            // Hack to make sure content is loaded correctly, solves issue with Google Maps view not being rendered
            $(window).resize();
        });

        $('.info').popover({placement: 'auto'});
    },
       
    actions: {
        startPublishTour: function () {
            this.set('haveValidationErrors', !this.validateForPublish());
            this.set('haveValidationWarnings', this.checkForValidationWarnings() > 0);
            $('#publishTourStep1Modal').modal('show');
        },
        
        continueToPublishStep2: function() {
            $('#publishTourStep1Modal').modal('hide');
            $('#publishTourStep2Modal').modal('show');
        },

        confirmPublishTour: function() {
            this.send('publishTour');
            $('#publishTourStep2Modal').modal('hide');
        },
        
        startCancelingEditTour: function() {
            if(this.get('hasChanges'))  {
                $('#discardChangesTourModal').modal('show');
            } else {
                this.send('cancelEditTour');
            }
        },
        
        confirmDiscardChanges: function() {
            $('#discardChangesTourModal').modal('hide');
            this.send('cancelEditTour');
        },
        
        closeConfirmDiscardChangesDialog: function() {
            $('#discardChangesTourModal').modal('hide');
        },        
        
        toggleAdvancedOption: function() {
            this.set('showAdvancedOptions', !this.get('showAdvancedOptions'));
        },
        
        confirmDeleteTour: function() {
            this.send('deleteTour');
            $('#confirmDeleteImageModal').modal('hide');
        },
        
        startDeleteImage: function(image) {
            this.set('imageToDelete', image);
        },

        confirmDeleteImage: function() {
            this.send('deleteImage', this.get('imageToDelete'));
            this.send('closeConfirmDeleteImage');
            this.set('imageToDelete', null);
        },
    
        tagsUpdated: function (tags) {
            tags = tags || [];
            this.set("tags", tags);
        },

        cancelEditTour: function () {
            var self = this;

            if (!self.get("tour").get("id")) {
                
                self.get("tour").deleteRecord();
                self.transitionToRoute("index");
            }
            else {                
                self.get("tour").rollback();
                
                self.set("newImage", null);
                            
                self.transitionToRoute("tour", self.get("tour"));
            }
        },
    
        publishTour: function () {
            var self = this;

            if (self.get("havePendingOperations")) {
                return;
            }
            
            if (!self.validateForPublish()) {
                self.get("alert").showErrorMessage("There are validation errors, please correct and try again. ");
                return;
            }
            self.get("tour").set("status", Fixtures.TourStatus.PUBLISHED);
            self.saveAndExit();
        },
    
        saveAsDraft: function () {
            var self = this;

            if(self.get("havePendingOperations")){
                return;
            }

            self.set("draftValidationErrors", false);
            
            if (!self.validateForDraft()) {
                self.get("alert").showErrorMessage("There are validation errors, tour name must be set before saving. ");
                return; 
            }
            self.get("tour").set("status", Fixtures.TourStatus.DRAFT);
            self.saveAndExit();
        },

        sendToReview: function () {
            var self = this;

            if (self.get("havePendingOperations")) {
                return;
            }

            if (!self.validateForDraft()) {
                self.get("alert").showErrorMessage("There are validation errors, tour name must be set before saving. ");
                return;
            }
            self.get("tour").set("status", Fixtures.TourStatus.IN_REVIEW);
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

                    self.get("tour").reload();
                   
                    self.get("alert").showSuccessMessage("Image was successfully added.", self.get("alert").long_delay);
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 401) {
                        self.get("login").send("removeToken");
                        self.get("alert").showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else if (status === 413) {
                        self.get("alert").showErrorMessage("Couldn't save the image, it's too big. Max image file size allowed is 15MB. ");
                    }
                    else {
                        self.get("alert").showErrorMessage("Sorry, an error occured when trying to save the image, please try again. ");
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
                    self.get("tour").reload();
                    self.set("havePendingOperations", false);
                    self.get("alert").showSuccessMessage("Image was successfully saved. ");
                }, 
                function(error) {
                    var status = error.status;
                    if (status === 401) {
                        self.get("login").send("removeToken");
                        self.get("alert").showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else {
                        self.get("alert").showErrorMessage("An error occured when saving the image, please try again. ");
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
                    self.get("alert").showSuccessMessage("Image was successfully deleted. ");
                },
                function(error) {
                    var status = error.status;
                    if(status === 401) {
                        self.get("login").send("removeToken");
                        self.get("alert").showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else {
                        self.get("alert").showErrorMessage("An error occured when deleting the image, please try again. ");
                    }
                    self.set("havePendingOperations", false);
                }
            );
        },
      
        // SELECT BOX ACTIONS

        selectCountry: function(country) {
            this.set("tour.country", country ? country.value : null);
        },

        selectAspect: function(aspect) {
            this.set("tour.aspect", aspect ? aspect.value : null);
        },

        selectGrade: function(grade) {
            this.set("tour.grade", grade ? grade.value : null);
        },

        selectTimeOfYearFrom: function(month) {
            this.set("tour.timeOfYearFrom", month ? month.value : null);
        },

        selectTimeOfYearTo: function(month) {
            this.set("tour.timeOfYearTo", month ? month.value : null);
        }
    },

    // METHODS

    saveAndExit: function () {
        var self = this;

        if (self.get("havePendingOperations")) {
            return;
        }

        self.set("havePendingOperations", true);
        
        self.get("tour").save().then(
            function() {                           
                self.set("havePendingOperations", false);
                self.get("alert").showSuccessMessage("Tour was successfully saved");
                self.transitionToRoute("tour", self.get("tour"));
            }, 
            function(error) {
                var status = error.status;
                if(status === 400) {
                    self.get("alert").showErrorMessage("Oh noes, there are validation errors, please try again. ");
                }
                else if(status === 401) {
                    self.get("login").send("removeToken");
                    self.get("alert").showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                }
                else {
                    self.get("alert").showErrorMessage("An error occured when saving the tour, please try again. ");
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
        image.set("tour", this.get("tour"));
        this.set("newImage", image);
    },
    
    // Required fields when saving as draft are: name
    validateForDraft: function() {
        return !this.get("tour.name") ? false : true;

        //if(!App.Validate.name(this.get("name")) ||
        //   !App.Validate.shortDesc(this.get("shortDescription"), true) ||
        //   !App.Validate.mediumDesc(this.get("startingPoint"), true) ||
        //   !App.Validate.shortDesc(this.get("dangerDescription"), true) ||
        //   !App.Validate.shortDesc(this.get("mountaineeringSkillsDescription"), true) ||
        //   !App.Validate.longDesc(this.get("itinerary"), true) ||
        //   !App.Validate.isPosNumberOrNull(this.get("timingMin")) ||
        //   !App.Validate.isPosNumberOrNull(this.get("timingMax")) ||
        //   !App.Validate.isPosNumberOrNull(this.get("highestPoint")) ||
        //   !App.Validate.isPosNumberOrNull(this.get("heightDifferenceAscent")) ||
        //   !App.Validate.isPosNumberOrNull(this.get("heightDifferenceDescent")) ||
        //   !App.Validate.isPosNumberOrNull(this.get("degreesMax"))) {
        //    return false;
        //}
        //return true;
    },
    
    // Required fields when publishing are: name, starting point, itinerary, timingMin/Max, heightDifferenceAscent/Descent
    validateForPublish: function() {      
        return !this.get("tour.name") ? false : true;

        //this.set("validationErrors", []);
        
        //if(!App.Validate.name(this.get("name"))){
        //    this.get("validationErrors").push("Name");
        //}
        //if(!App.Validate.shortDesc(this.get("shortDescription"), true)){
        //    this.get("validationErrors").push("Summary");
        //}
        //if(!App.Validate.mediumDesc(this.get("accessPoint"), false)){
        //    this.get("validationErrors").push("Access point");
        //}
        //if(!App.Validate.shortDesc(this.get("hazardsDescription"), true)){
        //    this.get("validationErrors").push("Hazards description");
        //}
        //if(!App.Validate.shortDesc(this.get("toolsDescription"), true)){
        //    this.get("validationErrors").push("Requires skills description");
        //}
        //if(!App.Validate.longDesc(this.get("itinerary"), false)){
        //    this.get("validationErrors").push("Description");
        //}
        //if(!App.Validate.isPosNumber(this.get("timingMin"))){
        //    this.get("validationErrors").push("Time min");
        //}
        //if(!App.Validate.isPosNumber(this.get("timingMax"))){
        //    this.get("validationErrors").push("Time max");
        //}
        //if(!App.Validate.isPosNumberOrNull(this.get("elevationMax"))){
        //    this.get("validationErrors").push("Highest point");
        //}
        //if(!App.Validate.isPosNumber(this.get("elevationGain"))){
        //    this.get("validationErrors").push("Elevation gain");
        //}
        //if(!App.Validate.isPosNumber(this.get("elevationLoss"))){
        //    this.get("validationErrors").push("Elevation loss");
        //} 
        //if(!App.Validate.isPosNumberOrNull(this.get("degreesMax"))) {
        //    this.get("validationErrors").push("Steepness");
        //}
        
        //return this.get("validationErrors").length === 0;
    },
    
    checkForValidationWarnings: function() {
        return false;
        //this.set("validationWarnings", []);
        
        //if(!App.Validate.isNotNullOrEmpty(this.get("shortDescription"))){
        //    this.get("validationWarnings").push("Summary");
        //}
        //if(!this.get("grade")) {
        //    this.get("validationWarnings").push("Grade");
        //}
        //if(!App.Validate.isPosNumber(this.get("elevationMax"))) {
        //    this.get("validationWarnings").push("Highest point");
        //}
        //if(!this.get("timeOfYearFrom")) {
        //    this.get("validationWarnings").push("Season from");
        //}
        //if(!this.get("timeOfYearTo")) {
        //    this.get("validationWarnings").push("Season to");
        //}
        //if(!App.GeoHelper.geojsonContainsPath(this.get("mapGeoJson"))){
        //    this.get("validationWarnings").push("Map path");
        //}
        //if (!App.GeoHelper.geojsonContainsSummitPoint(this.get("mapGeoJson"))) {
        //    this.get("validationWarnings").push("Map summit point");
        //}
        //if(!App.Validate.lengthOrNull(this.get("itinerary"), 100, 8000, false)){
        //    this.get("validationWarnings").push("Description (very short)");
        //}
        //return this.get("validationWarnings").length > 0;
    },
    
    replaceHtmlChars: function() {
        if(!this.get("tour.itinerary")){ 
            return; 
        }
    
        var str = this.get("tour.itinerary").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.set("tour.itinerary", str);
    },

    // COMPUTED PROPS

    hasChanges: Ember.computed('tour.isDirty', 'newImage', function() {
        return this.get("tour.isDirty") || this.get("hasNewImage");
    }),
    
    isStartPublishDisabled: Ember.computed('tour.{status,name,isDirty}', 'havePendingOperations', function() {
        if (this.get("havePendingOperations")) {
            return true;
        }

        if(this.get("isDeleted")){
            return true;
        }

        // if(!App.Validate.isNotNullOrEmpty(this.get("name"))){
        //     return true;
        // }

        if(this.get("isDraft") || this.get("isInReview") || this.get("isDirty")) {
            return false;
        }
        
        return true;
    }),
    
    isSaveAsDraftDisabled: Ember.computed('tour.{status,name,isDirty}', 'newImage', 'havePendingOperations', function() {
        if(this.get("havePendingOperations")) {
            return true;
        }

        if(this.get("tour.isNew")){
            return false;
        }

        // if(!App.Validate.isNotNullOrEmpty(this.get("tour.name"))){
        //     return true;
        // }

        return !this.get("isDraft") || !this.get("hasChanges");
    }),

    isSendToReviewDisabled: Ember.computed('tour.{status,name,isDirty}', 'newImage', 'havePendingOperations', function() {
        if (this.get("havePendingOperations")) {
            return true;
        }

        if(this.get("tour").get("isNew")){
            return false;
        }

        // if(!App.Validate.isNotNullOrEmpty(this.get("tour.name"))){
        //     return true;
        // }

        if (this.get("isDraft")) {
            return false;
        }
        
        return this.get("isInReview") && !this.get("hasChanges");
    }),

    isPublished: Ember.computed('tour.status', function() {
        return this.get("tour.status") === Fixtures.TourStatus.PUBLISHED;
    }),
    
    isDraft: Ember.computed('tour.status', function() {
        return this.get("tour.status") === Fixtures.TourStatus.DRAFT;
    }),

    isInReview: Ember.computed('tour.status', function() {
        return this.get("tour.status") === Fixtures.TourStatus.IN_REVIEW;
    }),
    
    isDeleted: Ember.computed('tour.status', function() {
        return this.get("tour.status") === Fixtures.TourStatus.DELETED;
    }),
    
    displayStatus: Ember.computed('tour.status', function() {
        switch (this.get("tour.status")) {
            case Fixtures.TourStatus.PUBLISHED:
                return "Published";
            case Fixtures.TourStatus.DRAFT:
                return "Draft";
            case Fixtures.TourStatus.DELETED:
                return "Deleted";
            case Fixtures.TourStatus.IN_REVIEW:
                return "In review";
            default:
                return "Undefined";
        }
    }),

    hasImages: Ember.computed('tour.images.length', function() {
        return !this.get("tour.images") ? false : this.get("tour.images.length") > 0;
    }),
    
    hasNewImage: Ember.computed('newImage', function() {
        return !this.get("newImage") ? false : true;
    }),

    hasPaths: Ember.computed('tour.mapGeoJson', function() {
        return !this.get("tour.mapGeoJson") ? false : true;
    }),
    
    // todo: ?
    isIncomplete: Ember.computed('tour.name', function() {
        return this.get("isDraft") ? false : this.checkForValidationWarnings() > 0;
    }),
    
    haveNoHazards: Ember.computed('tour.haveHazards', function() {
        return !this.get("tour.haveHazards");
    }),

    doesNotRequireTools: Ember.computed('tour.requiresTools', function() {
        return !this.get("tour.requiresTools");
    }),
    
    sortedActions: Ember.computed('tour.actions.[]', function() {
        // todo ...
        // return this.get("tour.actions").sortBy("time");
        return [];
    }),

    // Wrappers for fixtures lists (does not directly bind in handlebars..)

    months: Ember.computed(function() {
        return Fixtures.Months;
    }),

    aspects: Ember.computed(function() {
        return Fixtures.Aspects;
    }),

    countries: Ember.computed(function() {
        return Fixtures.Countries;
    }),

    grades: Ember.computed(function() {
        return Fixtures.Grades;
    }),
});
