App.AreaItemsController = Ember.ObjectController.extend();
App.register('controller:areaItems', App.AreaItemsController, {
    singleton : false
});

App.AreaItemController = Ember.ObjectController.extend({
    needs : ['browse'],   
    isExpanded : true,
    actions : {
        transitToArea : function(area) {
            this.transitionToRoute('area', area);
        },
        toggleArea : function() {
            var isExpanded = this.get('isExpanded');
            isExpanded = !isExpanded;
            this.set('isExpanded', isExpanded);
        },
        toggleTours : function() {
            var showTours = this.get('showTours');
            showTours = !showTours;
            this.set('showTours', showTours);
        }
    },
});
App.register('controller:areaItem', App.AreaItemController, {
    singleton : false
});

App.AreaController = Ember.ObjectController.extend({
    needs : ['login'],
    
    // Computed properties
    isNotDirty: function() {
        return !this.get('isDirty');
    }.property('isDirty'),
    
    isAddSubareaDisabled: function() {
        // TODO: Why doesn't this get called on property changed?!
        return false;
        //return !this.validateNewSubarea();
    }.property('newArea.name', 'newArea.description'),
    
    markedDescription: function() {
        if(!this.get('description')){ return null; }
        return marked(this.get('description'));
    }.property('description'),
    
    // Actions
    actions: {
        editArea : function() {
            this.clearErrorFlags();
            this.set('editAreaMode', true);
        },
        saveArea : function() {
            if(this.get('havePendingOperations')){
                return;
            }
            
            this.set('havePendingOperations', true);
            var area = this.get('model');
            var self = this;
            self.clearErrorFlags();
            this.replaceHtmlChars();
            area.save().then(
                function() {
                    self.set('editAreaMode', false);
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
        startAddingSubArea : function() {
            if(this.get('havePendingOperations')){
                return;
            }
            var newArea = this.store.createRecord('area');
            var area = this.get('model');
            newArea.set('parent', area);
            this.set('newArea', newArea);
        },
        addSubArea : function() {
            if(this.get('havePendingOperations')){
                return;
            }
            this.set('havePendingOperations', true);
            var newArea = this.get('newArea');
            var self = this;
            self.clearErrorFlags();
            this.replaceHtmlChars();
            newArea.save().then(
                function() {
                    self.set('havePendingOperations', false);
                    self.send('showUpdateSuccessMsg');
                    // Reload area to get proper children list
                    self.get('model').reload();
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
        cancelEdit: function() {
            var area = this.get('model');
            var newArea = this.get('newArea');
            if(area !== null && typeof area !== 'undefined') {
                area.rollback();
            }
            if(newArea !== null && typeof newArea !== 'undefined' ) {
                newArea.rollback();
            }
            
            this.set('editAreaMode', false);
            area.reload();
            this.set('model', area);
        },
        cancelAddSubArea: function() {
            var newArea = this.get('newArea');
            if(newArea !== null && typeof newArea !== 'undefined' ) {
                newArea.rollback();
            }
        },
        addTour : function() {
            // TODO: How to pass current area to route? Now area is not pre-set on the new tour 
            this.transitionToRoute('tour.new');
        },
        showUpdateSuccessMsg: function() {
            var self = this;
            this.set('updateSuccessfully', true);
            setTimeout(function(){
                self.set('updateSuccessfully', false);
            }, 4000);
        }
    },
    
    clearErrorFlags: function() {
        this.set('validationErrors', false);
        this.set('serverErrors', false);
        this.set('authenticationErrors', false);
        this.set('updateSuccessfully', false);
    },
        
    validate: function() {
        if(!App.Validate.name(this.get('name')) ||
           !App.Validate.mediumDesc(this.get('description'), true)){
            return false;
        }
        return true;
    },
    
    validateNewSubarea: function() {
        if(!this.get('newArea')) {
            return false;
        }
        if(!App.Validate.name(this.get('newArea').get('name')) ||
           !App.Validate.mediumDesc(this.get('newArea').get('description'), true)){
            return false;
        }
        return true;
    },
    
    replaceHtmlChars: function() {
        if(!this.get('description')){ return; }
        var str = this.get('description').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.set('description', str);
    }
});