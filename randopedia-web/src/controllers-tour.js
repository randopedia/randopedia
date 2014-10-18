// Controllers

App.ToursController = Ember.ArrayController.extend();

App.TourController = Ember.ObjectController.extend({
    needs : ['login', 'index'],

    actions: {
        viewTourOnMap: function() {
            this.get('controllers.index').send('viewTourOnMap', this.get('model'));
        },
        downloadGpxFile: function () {
             App.GeoHelper.saveAsGpx(this.get('mapGeoJson'), this.get('name'), this.get('itinerary'));
        },
        startAddReviewComment: function() {
            var comment = this.store.createRecord('comment');
            var loginController = this.get('controllers.login');
            var userId = loginController.get('currentUser').get('userId');
            var userName = loginController.get('currentUser').get('userName');
            comment.set('tour', this.get('model'));
            comment.set('userId', userId);
            comment.set('userName', userName);
            this.set('newComment', comment);
            this.set('addCommentMode', true);
        },
        
        cancelSaveReviewComment: function() {
            this.set('addCommentMode', false);
            this.set('newComment', null);
            this.set('newCommentText', null);
            this.set('commentError', null);
        },
        
        saveReviewComment: function() {
            if(this.get('havePendingOperations')){
                return;
            }
            if(!App.Validate.isNotNullOrEmpty(this.get('newCommentText'))){
                return;
            }
            var self = this;
            self.set('havePendingOperations', true);
            var newComment = self.get('newComment');
            newComment.set('comment', self.get('newCommentText'));
            newComment.save().then(
                function() {
                    self.get('model').reload();
                    self.set('addCommentMode', false);
                    self.set('newComment', null);
                    self.set('newCommentText', null);
                    self.set('havePendingOperations', false);
                    App.Alerts.showSuccessMessage('Comment was added');
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.get('controllers.login').send('removeToken');
                        App.Alerts.showErrorMessage('Oh noes, you have most likely been logged out. Try to log in again.');
                    }
                    else {
                        App.Alerts.showErrorMessage('An error occured when saving comment, please try again');
                    }
                    self.set('havePendingOperations', false);
                }
            );
        },
    },
    
    // Computed properties
    
    isPublished: function() {
        return this.get('status') === App.Fixtures.TourStatus.PUBLISHED;
    }.property('model.status'),
    
    isDraft: function() {
        return this.get('status') === App.Fixtures.TourStatus.DRAFT;
    }.property('model.status'),
    
    isInReview: function () {
        return this.get('status') === App.Fixtures.TourStatus.IN_REVIEW;
    }.property('model.status'),

    isDeleted: function() {
        return this.get('status') === App.Fixtures.TourStatus.DELETED;
    }.property('model.status'),

    hasImages: function(){
        if(!this.get('images')){
            return false;
        }
        return this.get('images').get('length') > 0;
    }.property('model.images.length'),

    hasPaths: function () {
        if(!this.get('mapGeoJson')){
           return false;
        }
        return true;
    }.property('model.mapGeoJson'),
    
    isIncomplete: function() {
        var warningCount = 0;
        if(!App.Validate.isNotNullOrEmpty(this.get('shortDescription'))){ warningCount++; }
        if(!this.get('grade')) { warningCount++; }
        if(!App.Validate.isPosNumber(this.get('elevationMax'))) { warningCount++; }
        if(!this.get('timeOfYearFrom')) { warningCount++; }
        if(!this.get('timeOfYearTo')) { warningCount++; }
        if(!App.Validate.isNotNull(this.get('mapGeoJson'))){ warningCount++; }
        if(!App.Validate.lengthOrNull(this.get('itinerary'), 100, 8000, false)){ warningCount++; }
        return warningCount > 0;
    }.property('name'),
    
    haveNoHazards: function() {
        return !this.get('haveHazards');
    }.property('haveHazards'),

    doesNotRequireTools: function() {
        return !this.get('requiresTools');
    }.property('requiresTools'),
    
    markedItinerary: function() {
        if(!this.get('itinerary')){ 
            return null;
        }
        return marked(this.get('itinerary'));
    }.property('itinerary'),
});

App.TourEditController = Ember.ObjectController.extend({
    needs: ['login'],
    queryParams: ['createNewInArea'], // Used for new tour triggered from area edit view
    validationErrors: [],
    validationWarnings: [],

    init: function() {
        var newAreaId = this.get('createNewInArea');
        if (newAreaId) {
            this.store.find('area', newAreaId).then(function(area) {
                this.get('model').set('area', area);
            });
        }
    },

    actions: {
        cancelEditTour: function() {
            if(!this.get('model').get('id')) {
                this.get('model').deleteRecord();
                this.transitionToRoute('index');
            }
            else {
                this.get('model').rollback();
                
                if(this.get('model').get('area') !== null){
                    this.get('model').get('area').rollback();
                }

                this.set('newImage', null);
                
                this.set('areaIsUpdated', false);
                this.get('model').reload();
                
                this.transitionToRoute('tour', this.get('model'));
            }
        },
    
        publishTour: function() {
            if(this.get('havePendingOperations')){
                return;
            }
            var area = this.get('area');
            if (!this.validateForPublish()) {
                App.Alerts.showErrorMessage('There are validation errors, please correct and try again.');
                return;
            }
            this.get('model').set('status', App.Fixtures.TourStatus.PUBLISHED);
            this.saveAndExit(area);
        },
    
        saveAsDraft: function() {
            if(this.get('havePendingOperations')){
                return;
            }
            this.set('draftValidationErrors', false);
            
            var area = this.get('area');
            if(!this.validateForDraft()){
                App.Alerts.showErrorMessage('There are validation errors, area and name must be set before saving');
                return; 
            }
            this.get('model').set('status', App.Fixtures.TourStatus.DRAFT);
            this.saveAndExit(area);
        },

        sendToReview: function () {
            if (this.get('havePendingOperations')) {
                return;
            }

            var area = this.get('area');
            if (!this.validateForDraft()) {
                App.Alerts.showErrorMessage('There are validation errors, area and name must be set before saving');
                return;
            }
            this.get('model').set('status', App.Fixtures.TourStatus.IN_REVIEW);
            this.saveAndExit(area);
        },

        saveNewImage: function() {
            if(this.get('havePendingOperations')){
                return;
            }
            var self = this;
            self.set('havePendingOperations', true);
            var newImage = this.get('newImage');
            newImage.save().then(
                function() {
                   self.set('newImage', null);
                   self.set('havePendingOperations', false);
                   
                   self.get('model').reload();
                   App.Alerts.showSuccessMessage('Image was successfully added. ');
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.get('controllers.login').send('removeToken');
                        App.Alerts.showErrorMessage('Oh noes, you have most likely been logged out. Try to log in again. ');
                    }
                    else {
                        App.Alerts.showErrorMessage('An error occured when adding new image, please try again. ');
                    }
                    self.set('havePendingOperations', false);
                }
            );
        },
        
        removeNewImage: function() {
            this.set('newImage', null);
        },
        
        saveImage: function(image) {
            if(this.get('havePendingOperations')){
                return;
            }
            var self = this;
            self.set('havePendingOperations', true);
            image.save().then(
                function() {
                    self.get('model').reload();
                    self.set('havePendingOperations', false);
                    App.Alerts.showSuccessMessage('Image was successfully saved. ');
                }, 
                function(error) {
                    var status = error.status;
                    if (status === 403) {
                        self.get('controllers.login').send('removeToken');
                        App.Alerts.showErrorMessage('Oh noes, you have most likely been logged out. Try to log in again. ');
                    }
                    else {
                        App.Alerts.showErrorMessage('An error occured when saving the image, please try again. ');
                    }
                    self.set('havePendingOperations', false);
                }
            );
        },
        
        deleteImage: function(image) {
            if(this.get('havePendingOperations')){
                return;
            }
            var self = this;
            self.set('havePendingOperations', true);
            image.deleteRecord();
            image.save().then(
                function() {
                    self.get('model').reload();
                    self.set('havePendingOperations', false);
                    App.Alerts.showSuccessMessage('Image was successfully deleted. ');
                },
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.get('controllers.login').send('removeToken');
                        App.Alerts.showErrorMessage('Oh noes, you have most likely been logged out. Try to log in again. ');
                    }
                    else {
                        App.Alerts.showErrorMessage('An error occured when deleting the image, please try again. ');
                    }
                    self.set('havePendingOperations', false);
               }
            );
        },
        
        startAddingSubArea : function() {
            if(this.get('havePendingOperations')){
                return;
            }
            this.set('addSubareaMode', true);
            var newArea = this.store.createRecord('area');
            this.set('newArea', newArea);
        },
        
        cancelAddSubArea: function() {
            this.get('newArea').deleteRecord();
            this.set('addSubareaMode', false);
        },
        
        addSubArea : function() {
            var newArea = this.get('newArea');
            if(!newArea || !App.Validate.name(newArea.get('name'))){
                return;
            }
            this.set('havePendingOperations', true);
            newArea.set('parent', this.get('tempSelectedArea'));
            var self = this;
            newArea.save().then(
                function() {
                    //console.log('WHY DONT WE GET HERE? Area is created OK on server, but save method seems to never return...');
                    self.store.find('area').then(
                            function(areas){
                                self.set('allAreas', areas);
                                self.set('tempSelectedArea', self.get('newArea'));
                                self.set('addSubareaMode', false);
                                self.set('havePendingOperations', false);
                            }
                    );
                    App.Alerts.showSuccessMessage('Area was successfully created. ');
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 421) {
                        App.Alerts.showErrorMessage('Oh noes, there are validation errors, please try again. ');
                    }
                    else if(status === 403) {
                        self.get('controllers.login').send('removeToken');
                        App.Alerts.showErrorMessage('Oh noes, you have most likely been logged out. Try to log in again. ');
                    }
                    else {
                        App.Alerts.showErrorMessage('An error occured when adding the area, please try again. ');
                    }
                    self.set('havePendingOperations', false);                    
                }
            );
        },       
        
        // MAP ACTIONS
        
        updatePaths: function(geoJson) {
            this.set('model.mapGeoJson', geoJson);
        },
        
        deletePaths: function() {
            this.set('model.mapGeoJson', null);
        },
        
        updateGeoJson: function(geoJson) {
            this.set('model.mapGeoJson', geoJson);
        }
        
    },

    hasTagChanges: function() {
        var tags = this.get('tags');
        var tagsArray = this.getTagsArrayFromString();
        if(tags !== null) {
            if(tags.length !== tagsArray.length) {
                return true;
            }
        } else if (tagsArray !== null && tagsArray.length > 0) {
            return true;
        }
        return false;
    },
    
    saveAndExit: function (area) {
        this.set('havePendingOperations', true);
        var self = this;
        var tagsArray = this.getTagsArrayFromString();
        var cleanTagsArray = [];
        if(tagsArray !== null && typeof tagsArray !== 'undefined') {
            
            tagsArray.forEach(function(item) {
                if(item.length > 0) {
                    cleanTagsArray.push(item);
                }
            });
            this.get('model').set('tags', cleanTagsArray);
        }
        this.get('model').save().then(
            function() {
                self.set('areaIsUpdated', false);
                self.get('model').reload();
            
                self.set('havePendingOperations', false);
                self.set('tagsString', self.getTagsStringFromTags());
                self.transitionToRoute('tour', self.get('model'));
            
                if(area !== null && typeof area !== 'undefined') {
                    // Reload area so new tour shows in area tour list
                    area.reload();
                }
                self.set('havePendingOperations', false);
                App.Alerts.showSuccessMessage('Tour was successfully saved');
            }, 
            function(error) {
                var status = error.status;
                if(status === 421) {
                    App.Alerts.showErrorMessage('Oh noes, there are validation errors, please try again. ');
                }
                else if(status === 403) {
                    self.get('controllers.login').send('removeToken');
                    App.Alerts.showErrorMessage('Oh noes, you have most likely been logged out. Try to log in again. ');
                }
                else {
                    App.Alerts.showErrorMessage('An error occured when saving the tour, please try again. ');
                }
                self.set('havePendingOperations', false);
            }
        );    
    },
    
    clearValidationFlags: function() {
        this.set('validationErrors', []);
        this.set('validationWarnings', []);
    },

    addImageForUpload: function(imageData) {
        var image = this.store.createRecord('image');
        image.set('imageData', imageData);
        image.set('tour', this.get('model'));
        this.set('newImage', image);
    },
    
    // Required fields when saving as draft are: name
    validateForDraft: function() {
        if(!App.Validate.name(this.get('name')) ||
           !this.get('area') ||
           !App.Validate.shortDesc(this.get('shortDescription'), true) ||
           !App.Validate.mediumDesc(this.get('startingPoint'), true) ||
           !App.Validate.shortDesc(this.get('dangerDescription'), true) ||
           !App.Validate.shortDesc(this.get('mountaineeringSkillsDescription'), true) ||
           !App.Validate.longDesc(this.get('itinerary'), true) ||
           !App.Validate.isPosNumberOrNull(this.get('timingMin')) ||
           !App.Validate.isPosNumberOrNull(this.get('timingMax')) ||
           !App.Validate.isPosNumberOrNull(this.get('highestPoint')) ||
           !App.Validate.isPosNumberOrNull(this.get('heightDifferenceAscent')) ||
           !App.Validate.isPosNumberOrNull(this.get('heightDifferenceDescent')) ||
           !App.Validate.isPosNumberOrNull(this.get('degreesMax'))) {
               return false;
        }
        return true;
    },
    
    // Required fields when publishing are: name, starting point, itinerary, timingMin/Max, heightDifferenceAscent/Descent
    validateForPublish: function() {        
        this.set('validationErrors', []);
        
        if(!App.Validate.name(this.get('name'))){
            this.get('validationErrors').push('Name');
        }
        if(!this.get('area')){
            this.get('validationErrors').push('Area');
        }
        if(!App.Validate.shortDesc(this.get('shortDescription'), true)){
            this.get('validationErrors').push('Summary');
        }
        if(!App.Validate.mediumDesc(this.get('accessPoint'), false)){
            this.get('validationErrors').push('Access point');
        }
        if(!App.Validate.shortDesc(this.get('hazardsDescription'), true)){
            this.get('validationErrors').push('Hazards description');
        }
        if(!App.Validate.shortDesc(this.get('toolsDescription'), true)){
            this.get('validationErrors').push('Requires skills description');
        }
        if(!App.Validate.longDesc(this.get('itinerary'), false)){
            this.get('validationErrors').push('Description');
        }
        if(!App.Validate.isPosNumber(this.get('timingMin'))){
            this.get('validationErrors').push('Time min');
        }
        if(!App.Validate.isPosNumber(this.get('timingMax'))){
            this.get('validationErrors').push('Time max');
        }
        if(!App.Validate.isPosNumberOrNull(this.get('elevationMax'))){
            this.get('validationErrors').push('Highest point');
        }
        if(!App.Validate.isPosNumber(this.get('elevationGain'))){
            this.get('validationErrors').push('Elevation gain');
        }
        if(!App.Validate.isPosNumber(this.get('elevationLoss'))){
            this.get('validationErrors').push('Elevation loss');
        } 
        if(!App.Validate.isPosNumberOrNull(this.get('degreesMax'))) {
            this.get('validationErrors').push('Steepness');
        }
        
        return this.get('validationErrors').length === 0;
    },
    
    checkForValidationWarnings: function() {
        this.set('validationWarnings', []);
        
        if(!App.Validate.isNotNullOrEmpty(this.get('shortDescription'))){
            this.get('validationWarnings').push('Summary');
        }
        if(!this.get('grade')) {
            this.get('validationWarnings').push('Grade');
        }
        if(!App.Validate.isPosNumber(this.get('elevationMax'))) {
            this.get('validationWarnings').push('Highest point');
        }
        if(!this.get('timeOfYearFrom')) {
            this.get('validationWarnings').push('Season from');
        }
        if(!this.get('timeOfYearTo')) {
            this.get('validationWarnings').push('Season to');
        }
        if(!App.Validate.isNotNull(this.get('mapGeoJson'))){
            this.get('validationWarnings').push('Map');
        }
        if(!App.Validate.lengthOrNull(this.get('itinerary'), 100, 8000, false)){
            this.get('validationWarnings').push('Description (very short)');
        }
        return this.get('validationWarnings').length > 0;
    },
    
    replaceHtmlChars: function() {
        if(!this.get('itinerary')){ return; }
    
        var str = this.get('itinerary').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.set('itinerary', str);
    },

    getTagsArrayFromString : function() {
        var tagsString = this.get('tagsString');
        if(tagsString !== null && typeof tagsString !== 'undefined' && tagsString.length > 0) {
            tagsString = tagsString.replace(/\s/g, '');
            tagsString = tagsString.replace('#', '');
            var tagsArray = tagsString.split(',');
            return tagsArray;
        }
        return null;
    },
    
    getTagsStringFromTags: function() {
        var model = this.get('content');
        var tags = model.get('tags');
        if(tags === null || typeof tags === 'undefined') {
            return '';
        }
        var tagsString = '';
        var i = 0;
        tags.forEach(function(item) {
            tagsString += item;
            i++;
            if(i < tags.length) {
                tagsString += ', ';
            }
        });
        return tagsString;
    },

    // Computed properties

    tagsString : function() {
        var tagsString = this.getTagsStringFromTags();
        return tagsString;
    }.property('tags'),

    hasChanges: function() {
        if(this.get('isDirty') || this.get('hasNewImage') || this.get('areaIsUpdated')) {
            return true;
        }
        if(this.hasTagChanges()) {
            return true;
        }
        
        return false;
    }.property('isDirty', 'newImage', 'areaIsUpdated', 'tags', 'tagsString'),
    
    isStartPublishDisabled: function() {
        if(this.get('isDeleted')){
            return true;
        }
        if(!App.Validate.isNotNullOrEmpty(this.get('name'))){
            return true;
        }
        if(this.get('isDraft') || this.get('isDirty') || this.get('areaIsUpdated')){
            return false;
        }
        if(this.hasTagChanges()) {
            return false;
        }
        
        return true;
    }.property('isDirty', 'status', 'areaIsUpdated', 'name', 'tagsString'),
    
    isSaveAsDraftDisabled: function() {
        if(this.get('model').get('isNew')){
            return false;
        }
        if(!App.Validate.isNotNullOrEmpty(this.get('name'))){
            return true;
        }
        return !this.get('isDraft') || !this.get('hasChanges');
    }.property('model.status', 'isDirty', 'newImage', 'areaIsUpdated', 'model.name'),

    isSendToReviewDisabled: function() {
        if(this.get('model').get('isNew')){
            return false;
        }
        if(!App.Validate.isNotNullOrEmpty(this.get('name'))){
            return true;
        }

        if (this.get('isDraft')) {
            return false;
        }
        
        return this.get('isInReview') && !this.get('hasChanges');
    }.property('model.status', 'isDirty', 'newImage', 'areaIsUpdated', 'model.name'),

    isPublished: function() {
        return this.get('status') === App.Fixtures.TourStatus.PUBLISHED;
    }.property('model.status'),
    
    isDraft: function() {
        return this.get('status') === App.Fixtures.TourStatus.DRAFT;
    }.property('model.status'),

    isInReview: function () {
        return this.get('status') === App.Fixtures.TourStatus.IN_REVIEW;
    }.property('model.status'),
    
    isDeleted: function() {
        return this.get('status') === App.Fixtures.TourStatus.DELETED;
    }.property('model.status'),
    
    displayStatus: function() {
        var status = this.get('status');
        if(status === App.Fixtures.TourStatus.PUBLISHED){ return "Published"; }
        if(status === App.Fixtures.TourStatus.DRAFT){ return "Draft"; }
        if (status === App.Fixtures.TourStatus.DELETED) { return "Deleted"; }
        if (status === App.Fixtures.TourStatus.IN_REVIEW) { return "In review"; }
        return 'Undefined';
    }.property('model.status'),

    hasImages: function(){
        if(!this.get('images')){
            return false;
        }
        return this.get('images').get('length') > 0;
    }.property('model.images.length'),
    
    hasNewImage: function() {
        if(!this.get('newImage')){
          return false;  
        }
        return true;
    }.property('newImage'),

    hasPaths: function() {
        if(!this.get('mapGeoJson')){
           return false;
        }
        return true;
    }.property('model.mapGeoJson'),
    
    isIncomplete: function() {
        if (this.get('isDraft')) {
             return false;
        }
        return this.checkForValidationWarnings() > 0;
    }.property('name'),
    
    haveNoHazards: function() {
        return !this.get('haveHazards');
    }.property('haveHazards'),

    doesNotRequireTools: function() {
        return !this.get('requiresTools');
    }.property('requiresTools'),
});

App.MytoursController = Ember.ObjectController.extend({
    needs: 'login',
    user: null,
    drafts: [],
    updates: [],
    reviews: [],

    init: function () {
        var self = this;
        self.user = this.get('controllers.login').get('currentUser');

        self.store.findQuery('tour', { status: App.Fixtures.TourStatus.DRAFT }).then(function (tours) {
            self.set('drafts', tours);
            self.set('isLoadingDrafts', false);
        }, function() {
            self.set('isLoadingDrafts', false);
            App.Alerts.showErrorMessage('An error occured when loading drafts, are you logged in?');
        });

        self.store.findQuery('tour', { usersTours: true }).then(function (tours) {
            self.set('updates', tours);
            self.set('isLoadingUpdates', false);
        }, function () {
            self.set('isLoadingDrafts', false);
            App.Alerts.showErrorMessage('An error occured when loading tours, are you logged in?');
        });

        self.store.findQuery('tour', { status: App.Fixtures.TourStatus.IN_REVIEW }).then(function (tours) {
            self.set('reviews', tours);
            self.set('isLoadingReviews', false);
        }, function () {
            self.set('isLoadingReviews', false);
            App.Alerts.showErrorMessage('An error occured when loading tours in review, are you logged in?');
        });
    }
});
