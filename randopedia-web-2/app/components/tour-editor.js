import Component from '@ember/component';
import { computed } from '@ember/object';
import Fixtures from '../utils/fixtures';

export default Component.extend({
    tourStatus: computed('tour', function() {
        if(!this.get("tour.id")) {
            return "New";
        }

        switch(this.get("tour.status"))
        {
            case Fixtures.TourStatus.PUBLISHED:
                return "Published";
            case Fixtures.TourStatus.DRAFT:
                return "Draft";
            default:
                return "Unknown";
        }
    }),

    isNew: computed('tour', function() {
       return this.get("tour.id");
    }),

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

        toggleIncomplete: function() {
            this.set("tour.isIncomplete", !this.get("tour.isIncomplete"));
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

        // SELECT BOX ACTIONS

        selectCountry: function(country) {
            this.set("tour.country", country);
        },

        selectAspect: function(aspect) {
            this.set("tour.aspect", aspect);
        },

        selectGrade: function(grade) {
            this.set("tour.grade", grade);
        },

        selectTimeOfYearFrom: function(month) {
            this.set("tour.timeOfYearFrom", month);
        },

        selectTimeOfYearTo: function(month) {
            this.set("tour.timeOfYearTo", month);
        },
    },

    // Wrappers for fixtures lists (does not directly bind in handlebars..)

    months: computed(function() {
        return Fixtures.Months;
    }),

    aspects: computed(function() {
        return Fixtures.Aspects;
    }),

    countries: computed(function() {
        return Fixtures.Countries;
    }),

    grades: computed(function() {
        return Fixtures.Grades;
    })
});
