import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Component.extend({
    login: Ember.inject.service(),
    language: Ember.inject.service(),
    alert: Ember.inject.service(),
    validation: Ember.inject.service(),

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

        $('[data-toggle="popover"]').popover({placement: 'left'});
    },
       
    actions: {
        startPublishTour: function () {
            this.set('haveValidationErrors', !this.validateForPublish());
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
            this.set("tour.tags", tags);
            this.set("tagsIsDirty", true); // hack: belongsTo props does not update hasDirtyAtrributes in model
        },

        cancelEditTour: function () {
            var self = this;

            if (!self.get("tour.id")) {
                self.get("tour").deleteRecord();
                self.get("router").transitionTo("index");
            
            } else {                
                self.get("tour").rollbackAttributes();
                self.set("newImage", null);
                self.get("router").transitionTo("tour", self.get("tour"));
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
                        self.get("login").removeToken();
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
            console.debug("tour-edit.saveImage - IS THIS IN USE?");

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
            console.debug("tour-edit.deleteImage - IS THIS IN USE?");

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
                        self.get("login").removeToken();
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
                self.get("router").transitionTo("tour", self.get("tour"));
            }, 
            function(error) {
                var status = error.status;
                if(status === 400) {
                    self.get("alert").showErrorMessage("Oh noes, there are validation errors, please try again. ");
                }
                else if(status === 401) {
                    self.get("login").removeToken();
                    self.get("alert").showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                }
                else {
                    self.get("alert").showErrorMessage("An error occured when saving the tour, please try again. ");
                }
                self.set("havePendingOperations", false);
            }
        );    
    },

    addImageForUpload: function(imageData) {
        var image = this.store.createRecord("image");
        image.set("imageData", imageData);
        image.set("tour", this.get("tour"));
        this.set("newImage", image);
    },
    
    validateForDraft: function() {
        return this.get("nameIsValid") && 
               this.get("elevationGainIsValid") && 
               this.get("elevationLossIsValid") &&
               this.get("elevationMaxIsValid") && 
               this.get("timingMinIsValid") && 
               this.get("timingMaxIsValid") && 
               this.get("degreesMaxIsValid");
    },
    
    validateForPublish: function() {      
        return this.get("nameIsValid") && 
               this.get("accessPointIsValid") &&
               this.get("descriptionIsValid") && 
               this.get("tagsAreValid") && 
               this.get("mapDataIsValid") &&
               this.get("elevationGainIsValid") && 
               this.get("elevationLossIsValid") && 
               this.get("elevationMaxIsValid") && 
               this.get("timingMinIsValid") && 
               this.get("timingMaxIsValid") && 
               this.get("degreesMaxIsValid");
    },
    
    replaceHtmlChars: function() {
        if(!this.get("tour.itinerary")){ 
            return; 
        }
    
        var str = this.get("tour.itinerary").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.set("tour.itinerary", str);
    },

    // COMPUTED PROPS

    nameIsValid: Ember.computed('tour.name', function() {
        return this.get("validation").name(this.get('tour.name'));
    }),

    accessPointIsValid: Ember.computed('tour.accessPoint', function() {
        return this.get("validation").mediumDesc(this.get('tour.accessPoint'), false);
    }),

    descriptionIsValid: Ember.computed('tour.itinerary', function() {
        return this.get("validation").longDesc(this.get('tour.itinerary'), false);
    }),

    tagsAreValid: Ember.computed('tour.tags', function() {
        return this.get("tour.tags.length") > 0;
    }),

    elevationGainIsValid: Ember.computed('tour.elevationGain', function() {
        return this.get("validation").isPosNumberOrNull(this.get("tour.elevationGain"));
    }),

    elevationLossIsValid: Ember.computed('tour.elevationLoss', function() {
        return this.get("validation").isPosNumberOrNull(this.get("tour.elevationLoss"));
    }),

    elevationMaxIsValid: Ember.computed('tour.elevationMax', function() {
        return this.get("validation").isPosNumberOrNull(this.get("tour.elevationMax"));
    }),

    timingMinIsValid: Ember.computed('tour.timingMin', function() {
        return this.get("validation").isPosNumberOrNull(this.get("tour.timingMin"));
    }),

    timingMaxIsValid: Ember.computed('tour.timingMax', function() {
        return this.get("validation").isPosNumberOrNull(this.get("tour.timingMax"));
    }),

    degreesMaxIsValid: Ember.computed('tour.degreesMax', function() {
        return this.get("validation").isPosNumberOrNull(this.get("tour.degreesMax"));
    }),

    mapDataIsValid: Ember.computed('tour.mapGeoJson', function() {
        // todo: ...
        return true;
    }),

    hasChanges: Ember.computed('tour.hasDirtyAttributes', 'newImage', 'tagsIsDirty', function() {
        return this.get("tour.hasDirtyAttributes") || this.get("tagsIsDirty") || this.get("hasNewImage");
    }),
    
    isStartPublishDisabled: Ember.computed('tour.{status,name,hasDirtyAttributes}', 'newImage', 'tagsIsDirty', 'havePendingOperations', function() {
        if (this.get("havePendingOperations") || this.get("isDeleted") || !this.get("validation").name(this.get("tour.name"))) {
            return true;
        }

        if(this.get("isDraft") || this.get("isInReview") || this.get("hasChanges")) {
            return false;
        }
        
        return true;
    }),
    
    isSaveAsDraftDisabled: Ember.computed('tour.{status,name,hasDirtyAttributes}', 'newImage', 'tagsIsDirty', 'havePendingOperations', function() {
        if (this.get("havePendingOperations") || this.get("isDeleted") || !this.get("validation").name(this.get("tour.name"))) {
            return true;
        }

        if(this.get("tour.isNew")){
            return false;
        }

        return !this.get("isDraft") || !this.get("hasChanges");
    }),

    isSendToReviewDisabled: Ember.computed('tour.{status,name,hasDirtyAttributes}', 'newImage', 'tagsIsDirty', 'havePendingOperations', function() {
        if (this.get("havePendingOperations") || this.get("isDeleted") || !this.get("validation").name(this.get("tour.name")) || this.get('isPublished')) {
            return true;
        }

        if(this.get("tour.isNew") || this.get("isDraft")){
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
        return this.get("isDraft") ? false : false;
    }),
    
    haveNoHazards: Ember.computed('tour.haveHazards', function() {
        return !this.get("tour.haveHazards");
    }),

    doesNotRequireTools: Ember.computed('tour.requiresTools', function() {
        return !this.get("tour.requiresTools");
    }),
    
    sortedActions: Ember.computed('tour.actions.[]', function() {
        return this.get("tour.actions").sortBy("time");
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
