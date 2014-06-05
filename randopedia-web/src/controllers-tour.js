// Controllers

App.ToursController = Ember.ArrayController.extend();

App.TourController = Ember.ObjectController.extend({
    needs : ['login'],

    actions: {
        startAddComment: function() {
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
        
        cancelSaveComment: function() {
            this.set('addCommentMode', false);
            this.set('newComment', null);
            this.set('newCommentText', null);
            this.set('commentError', null);
        },
        
        saveComment: function() {
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
                    self.set('commentError', null);
                    self.set('havePendingOperations', false);
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.set('commentError', 'Oh noes, you have most likely been logged out. Try to log in again!');
                        self.get('controllers.login').send('removeToken');
                    }
                    else {
                        self.set('commentError', 'An error occured when saving comment, please try again');
                    }
                    self.set('havePendingOperations', false);
                }
            );
        }
    },
    
    // Computed properties
    
    isPublished: function() {
        return this.get('status') === App.Fixtures.TourStatus.PUBLISHED;
    }.property('model.status'),
    
    isDraft: function() {
        return this.get('status') === App.Fixtures.TourStatus.DRAFT;
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

    hasPaths: function() {
        if(!this.get('mapPaths')){
           return false;
        }
        return true;
    }.property('model.mapPaths'),
    
    isIncomplete: function() {
        var warningCount = 0;
        if(!App.Validate.isNotNullOrEmpty(this.get('shortDescription'))){ warningCount++; }
        if(!this.get('grade')) { warningCount++; }
        if(!App.Validate.isPosNumber(this.get('elevationMax'))) { warningCount++; }
        if(!this.get('timeOfYearFrom')) { warningCount++; }
        if(!this.get('timeOfYearTo')) { warningCount++; }
        if(!App.Validate.isNotNull(this.get('mapPaths'))){ warningCount++; }
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
        if(!this.get('itinerary')){ return null; }
        return marked(this.get('itinerary'));
    }.property('itinerary'),
});

App.TourEditController = Ember.ObjectController.extend({
    needs : ['login'],
    validationErrors: [],
    validationWarnings: [],
    
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
                this.set('areaIsUpdated', false);
                this.get('model').reload();
                this.transitionToRoute('tour', this.get('model'));
            }
        },
    
        goToPreview: function() {
            this.set('previewMode', true);
        },
        
        exitPreview: function() {
            this.set('previewMode', false);
        },
    
        publishTour: function() {
            if(this.get('havePendingOperations')){
                return;
            }
            var area = this.get('area');
            if(!this.validateForPublish()){ return; }
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
                this.set('draftValidationErrors', true);
                return; 
            }
            this.get('model').set('status', App.Fixtures.TourStatus.DRAFT);
            this.saveAndExit(area);
        },
    
        deleteTour: function() {
            // Delete tour functionality removed for now
            // this.get('model').set('status', App.Fixtures.TourStatus.DELETED);
            // this.saveAndExit();
        },
        
        restoreTour: function() {
            // Delete/Restore functionality removed for now
            // this.get('model').set('status', App.Fixtures.TourStatus.DRAFT);
            // this.saveAndExit();
        },

        saveNewImage: function() {
            if(this.get('havePendingOperations')){
                return;
            }
            var self = this;
            self.set('havePendingOperations', true);
            var newImage = this.get('newImage');
            self.clearErrorFlags();
            newImage.save().then(
                function() {
                   self.set('newImage', null);
                   self.set('havePendingOperations', false);
                   
                   self.get('model').reload();
                   self.send('showUpdateSuccessMsg');
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.set('authenticationErrors', true);
                        self.get('controllers.login').send('removeToken');
                    }
                    else {
                        self.set('serverErrors', true);
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
            self.clearErrorFlags();
            image.save().then(
                function() {
                    self.get('model').reload();
                    self.set('havePendingOperations', false);
                    self.send('showUpdateSuccessMsg');
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.set('authenticationErrors', true);
                        self.get('controllers.login').send('removeToken');
                    }
                    else {
                        self.set('serverErrors', true);
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
            self.clearErrorFlags();
            image.save().then(
                function() {
                    self.get('model').reload();
                    self.send('showUpdateSuccessMsg');
                    self.set('havePendingOperations', false);
                },
                function(error) {
                    var status = error.status;
                    if(status === 403) {
                        self.set('authenticationErrors', true);
                        self.get('controllers.login').send('removeToken');
                    }
                    else {
                        self.set('serverErrors', true);
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
                    console.log('WHY DONT WE GET HERE? Area is created OK on server, but save method seems to never return...');
                    self.store.find('area').then(
                            function(areas){
                                self.set('allAreas', areas);
                                self.set('tempSelectedArea', self.get('newArea'));
                                self.set('addSubareaMode', false);
                                self.set('havePendingOperations', false);
                            }
                    );
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 421) {
                        self.set('validationErrors', true);
                    }
                    else if(status === 403) {
                        self.set('authenticationErrors', true);
                        self.get('controllers.login').send('removeToken');
                    }
                    else {
                        self.set('serverErrors', true);
                    }
                    self.set('havePendingOperations', false);                    
                }
            );
        },
        
        showUpdateSuccessMsg: function() {
            var self = this;
            this.set('updateSuccessfully', true);
            setTimeout(function(){
                self.set('updateSuccessfully', false);
            }, 4000);
        },
        
        // MAP ACTIONS
        
        updatePaths: function(paths) {
            this.set('model.mapPaths', paths);
        },
        
        deletePaths: function() {
            this.set('model.mapPaths', null);
        }
        
    },
    
    saveAndExit: function(area) {
        this.set('havePendingOperations', true);
        var self = this;
        var tagsArray = this.get('tagsArray');
        if(tagsArray !== null && typeof tagsArray !== 'undefined') {
            this.get('model').set('tags', this.get('tagsArray'));
        }
        this.get('model').save().then(
            function() {
                self.set('areaIsUpdated', false);
                self.get('model').reload();
                self.clearErrorFlags();
            
                self.set('havePendingOperations', false);
                self.transitionToRoute('tour', self.get('model'));
            
                if(area !== null && typeof area !== 'undefined') {
                    // Reload area so new tour shows in area tour list
                    area.reload();
                }
                self.set('havePendingOperations', false);
            }, 
            function(error) {
                var status = error.status;
                if(status === 421) {
                    self.set('validationErrors', true);
                }
                else if(status === 403) {
                    self.set('authenticationErrors', true);
                    var loginController = self.get('controllers.login');
                    loginController.send('removeToken');
                }
                else {
                    self.set('serverErrors', true);
                }
                self.set('havePendingOperations', false);
            }
        );    
    },
    
    clearErrorFlags: function() {
        this.set('serverErrors', false);
        this.set('updateSuccessfully', false);
        this.set('authenticationErrors', false);
    },
    
    clearValidationFlags: function() {
        this.set('validationErrors', []);
        this.set('validationWarnings', []);
        this.set('draftValidationErrors', false);
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
        if(!App.Validate.isNotNull(this.get('mapPaths'))){
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
        
    // Computed properties
    
    hasChanges: function() {
        if(this.get('isDirty') || this.get('hasNewImage') || this.get('areaIsUpdated')) {
            return true;
        }
        var tags = this.get('tags');
        var tagsArray = this.get('tagsArray');
        if(tags !== null) {
            if(tags.length !== tagsArray.length) {
                return true;
            }
        }
        return false;
    }.property('isDirty', 'newImage', 'areaIsUpdated', 'tagsArray'),
    
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
        var tags = this.get('tags');
        var tagsArray = this.get('tagsArray');
        if(tags !== null) {
            if(tags.length !== tagsArray.length) {
                return false;
            }
        }
        return true;
    }.property('isDirty', 'status', 'areaIsUpdated', 'name', 'tagsArray'),
    
    isSaveAsDraftDisabled: function() {
        if(this.get('model').get('isNew')){
            return false;
        }
        if(!App.Validate.isNotNullOrEmpty(this.get('name'))){
            return true;
        }
        return !this.get('isDraft') || !this.get('hasChanges');
    }.property('model.status', 'isDirty', 'newImage', 'areaIsUpdated', 'model.name'),

    isPublished: function() {
        return this.get('status') === App.Fixtures.TourStatus.PUBLISHED;
    }.property('model.status'),
    
    isDraft: function() {
        return this.get('status') === App.Fixtures.TourStatus.DRAFT;
    }.property('model.status'),
    
    isDeleted: function() {
        return this.get('status') === App.Fixtures.TourStatus.DELETED;
    }.property('model.status'),
    
    displayStatus: function() {
        var status = this.get('status');
        if(status === App.Fixtures.TourStatus.PUBLISHED){ return "Published"; }
        if(status === App.Fixtures.TourStatus.DRAFT){ return "Draft"; }
        if(status === App.Fixtures.TourStatus.DELETED){ return "Deleted"; }
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
        if(!this.get('mapPaths')){
           return false;
        }
        return true;
    }.property('model.mapPaths'),
    
    isIncomplete: function() {
        if(this.get('isDraft')){ return false; }
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
    init: function() {
        this.user = this.get('controllers.login').get('currentUser');
        this.set('isLoadingDrafts', true);
        this.set('serverErrors', false);
        var self = this;
        this.store.findQuery('tour', {status : App.Fixtures.TourStatus.DRAFT}).then(function(tours) {
            self.set('drafts', tours);
            self.set('isLoadingDrafts', false);
        }, function(error) {
            self.set('serverErrors', true);
            self.set('isLoadingDrafts', false);
        });
    }
});