App.ApplicationView = Ember.View.extend({
    classNames: ['app-root-view'],
    didInsertElement: function() {
        // Set the negative margin on the top menu for slide-menu pages (visible for small screens)
//        var $selector1 = $('#topMenu'), events = 'click.fndtn';
//        if ($selector1.length > 0){
//            $selector1.css("margin-top", $selector1.height() * -1);
//        }
    }
});

App.LoginModalView = Ember.View.extend({
    templateName: 'login-modal-view',
    actions: {
        loginWithFacebook: function() {
            this.get('controller.controllers.login').send('loginWithFacebook');
            this.closeModal();
        },
        loginWithGoogle: function() {
            this.get('controller.controllers.login').send('loginWithGoogle');
            this.closeModal();
        },
    },
    closeModal: function() {
        $('#loginViewModalId').modal('hide');
    }
});

App.UserMenuView = Ember.View.extend({
    templateName: 'usermenu-view',
    actions: {
        goToAddNewTour: function(){
            this.get('controller').transitionToRoute('tour.new');
            this.closeUserMenuDropdown();
        },
        goToMyTours: function() {
            this.get('controller').transitionToRoute('mytours');
            this.closeUserMenuDropdown();
        }
    },
    closeUserMenuDropdown: function() {
        if ($('#userMenuDropdown').hasClass('open')) {
             $('#toggleUserMenuDropdown').trigger('click');
        }
    }
});

App.IndexSmallView = Ember.View.extend({
   templateName: 'index-small',

   didInsertElement: function() {
       if(this.get('controller.currentTabSelection') === 2){
           this.send('goToMap');
        }
       else if(this.get('controller.currentTabSelection') === 3){
          this.send('goToAreas');
       }
       else {
           this.send('goToHome');
       }
   },

   actions: {
       goToHome: function() { this.setActiveTab(1); },
       goToMap: function() { this.setActiveTab(2); },
       goToAreas: function() { this.setActiveTab(3); }
   },
   
   showHome: function() {
       return this.get('controller.currentTabSelection') === 1;
   }.property('controller.currentTabSelection'),
   
   showMap: function() {
       return this.get('controller.currentTabSelection') === 2;
   }.property('controller.currentTabSelection'),
   
   showAreas: function() {
       return this.get('controller.currentTabSelection') === 3;
   }.property('controller.currentTabSelection'),   
   
   setActiveTab: function(tabId) {
       this.set('controller.currentTabSelection', tabId);
       
       this.$('#index-tab-1').removeClass('selected');
       this.$('#index-tab-2').removeClass('selected');
       this.$('#index-tab-3').removeClass('selected');

        if(tabId === 1){
            this.$('#index-tab-1').addClass('selected');
        }
        else if(tabId === 2){
            this.$('#index-tab-2').addClass('selected');
        }
        else if(tabId === 3){
            this.$('#index-tab-3').addClass('selected');
        }
   }
});

App.TourTeaserView = Ember.View.extend({
    templateName: 'tour-teaser-view',
    actions: {
        reloadTour: function() {
            this.get('controller').send('loadTeaserTour');
        }
    }
});

App.AboutView = Ember.View.extend({
   templateName: 'about',
});

App.AreaDetailsView = Ember.View.extend({
    templateName: 'areadetails-view',
});

App.AreaEditView = Ember.View.extend({
    templateName: 'areaedit-view', 
    didInsertElement: function() {
        $('.info').popover({placement: 'bottom'});
    },
    actions: {
        saveArea: function() {
            if(this.get('controller').validate() === true){
                $('#confirmPublishAreaModal').modal('show');
            }
            else {
                $('#validationErrorsAreaModal').modal('show');
            }  
        },
        confirmSaveArea: function() {
            this.get('controller').send('saveArea');
        },
        startCancelingEdit: function() {
            if(this.get('controller').get('isDirty'))  {
                $('#discardChangesAreaModal').modal('show');
            } else {
                this.get('controller').send('cancelEdit');
            }
        },
        confirmDiscardChanges: function() {
            this.get('controller').send('cancelEdit');
        },        
        startAddSubArea: function() {
            this.get('controller').send('startAddingSubArea');
        },
        cancelAddSubAreaDialog: function() {
            this.get('controller').send('cancelAddSubArea');
        },
        addSubArea: function() {
            this.get('controller').send('addSubArea');
        }
    }
});

App.AreaBrowseItemsView = Ember.View.extend({
    templateName: 'area-browse-items-view'
});

App.AreaBrowseItemView = Ember.View.extend({
    templateName: 'area-browse-item-view',
    actions: {
        routeToArea: function() {
            this.get('controller').transitionToRoute('area', this.get('controller').get('model'));
        }
    },
    areaTitle: function() {
        var controller = this.get('controller');
        var title = controller.get('name');
        if(controller.get('hasTours')){
            var tourCount = controller.get('nbrTours');
            title = title + ' (' + tourCount + ')'; 
        }
        
        return title;
    }.property('controller')
});

App.AreaBrowseView = Ember.View.extend();

App.AreaPickerView = Ember.View.extend({
   templateName: "areapicker-view",
   didInsertElement : function() {
       var self = this;
       self.get('controller').set('tempSelectedArea', this.get('controller').get('model').get('area'));
       
       $('#areaPickerModal').on('shown.bs.modal', function (e) {
           self.get('controller').set('toplevels', null);
           self.set('loading', true);
           
           self.get('controller').store.find('toplevel').then(function(toplevels){
               self.get('controller').set('toplevels', toplevels);
               self.set('loading', false);
           }, function(error) {
               App.Utils.log('Error when loading areas: ' + error);
           });
        });
   },
   actions: {
       confirmSelectedArea: function() {
           this.get('controller').get('model').set('area', this.get('controller').get('tempSelectedArea'));
           this.get('controller').set('areaIsUpdated', true);
           this.send('closeAreaPickerDialog');
       },
       openAreaPickerDialog: function() {
           this.get('controller').set('tempSelectedArea', this.get('controller').get('model').get('area'));
       },
       closeAreaPickerDialog: function() {
           this.get('parentView').send('closeAreaPickerDialog');
       },
//       expandAncestorTree: function() {
//           console.log('Tree expanded');
//       }
   }
});

App.AreaPickerItemView = Ember.View.extend({
    templateName: "areapicker-item-view",
    isExpanded: false,
    didInsertElement : function() {
//        if(this.get('isSelected')){
//            this.send('expandAncestorTree');
//        }
//        else {
//            this.set('isExpanded', false);  
//        }
    },
    actions: {
        selectArea: function() {
            this.get('controller').set('tempSelectedArea', this.get('item'));
        },
        toggleExpandChildren: function() {
            this.set('isExpanded', !this.get('isExpanded'));
        },
//        expandAncestorTree: function() {
//            console.log('expanding ' + this.get('item').get('name'));
//            this.set('isExpanded', true);
//            this.get('parentView').send('expandAncestorTree');
//        }
    },
    isSelected: function() {
        if(!this.get('controller').get('tempSelectedArea')){
            return false;
        }
        var selectedId = this.get('controller').get('tempSelectedArea').get('id');
        if(selectedId === this.get('item').get('id')){
            return true;
        }
        return false;
        
    }.property('controller.tempSelectedArea'),
});

/**
 * View showing details of a tour
 */
App.TourDetailsView = Ember.View.extend({
    templateName: 'tourdetails-view',
    
    didInsertElement: function() {
        $('#incompleteInfoButtonId').popover();
    },
    imageLoaded: function() {
        Ember.run.once(this, function () {
            $('#images-container').bjqs({
                'height': 671,
                'width': 1000,
                'responsive': true,
                'automatic': false,
                'usecaptions': true,
                'showmarkers': false,
            });
        });
        return true;
    }.property('controller.model.images.length'),
});

/**
 * View showing one tour in search result list
 */
App.TourItemView = Ember.View.extend({
    templateName: 'touritem-view'
});

/**
 * View for creating and editing a tour
 */
App.TourEditView = Ember.View.extend({
    templateName: 'touredit-view',
    showAdvancedOptions: false,
    haveValidationErrors: false,
    haveValidationWarnings: false,
    
    didInsertElement: function() {
        var self = this;
        
        $('#publishTourStep1Modal').on('shown.bs.modal', function (e) {
            self.set('haveValidationErrors', !self.get('controller').validateForPublish());
            self.set('haveValidationWarnings', self.get('controller').checkForValidationWarnings() > 0);
        });
        
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
              // Hack to make sure content is loaded correctly, solves issue with Google Maps view not being rendered
              $(window).resize();
        });
          
        $('.info').popover({placement: 'bottom'});
        
//        $(document).foundation('section', {
//            callback: function(){
//                // Hack to make sure content is loaded correctly, solves issue with Google Maps view not being rendered
//                $(window).resize();
//            }
//        });
    },
    actions: {
        startPublishTour: function() {
            $('#publishTourStep1Modal').modal('show');
        },
        continueToPublishStep2: function() {
            $('#publishTourStep1Modal').modal('hide');
            $('#publishTourStep2Modal').modal('show');
        },
        continueToPublishStep3: function() {
            //this.get('controller').send('publishTour');
            $('#publishTourStep2Modal').modal('hide');
            $('#publishTourStep3Modal').modal('show');
        },  
        confirmPublishTour: function() {
            this.get('controller').send('publishTour');
            $('#publishTourStep3Modal').modal('hide');
        },
        startCancelingEditTour: function() {
            if(this.get('controller').get('hasChanges'))  {
                $('#discardChangesTourModal').modal('hide');
            } else {
                this.get('controller').send('cancelEditTour');
            }
        },
        confirmDiscardChanges: function() {
            $('#discardChangesTourModal').modal('hide');
            this.get('controller').send('cancelEditTour');
        },
        closeConfirmDiscardChangesDialog: function() {
            $('#discardChangesTourModal').modal('hide');
        },        
        toggleAdvancedOption: function() {
            this.set('showAdvancedOptions', !this.get('showAdvancedOptions'));
        },
        closeAreaPickerDialog: function() {
            $('#areaPickerModal').modal('hide');
        },
        confirmAreaPickerDialog: function() {
            $('#areaPickerModal').modal('hide');
        },
        confirmDeleteTour: function() {
            this.get('controller').send('deleteTour');
            $('#confirmDeleteImageModal').modal('hide');
        },
        startDeleteImage: function(image) {
            this.set('imageToDelete', image);
        },
        confirmDeleteImage: function() {
            this.get('controller').send('deleteImage', this.get('imageToDelete'));
            this.send('closeConfirmDeleteImage');
            this.set('imageToDelete', null);
        }
    }
});

/**
 * Text field that is focused when inserted in DOM
 */
App.FocusTextField = Ember.TextField.extend({
    becomeFocused: function() {
        this.$().focus();
    }.on('didInsertElement')
});

App.SearchTextField = Ember.TextField.extend({
    attributeBindings: ['placeholder'],
    placeholder: 'Search ski tours...',
    classNames: ['search-textfield'],
    insertNewline: function() {
        this.get('parentView.controller.controllers.search').send('search');
    }
});

/**
 * View creating a bread crumb
 */
App.BreadCrumbView = Ember.View.extend({
    templateName: 'breadcrumb-view'
});

/**
 * View showing one comment
 */
App.CommentView = Ember.View.extend({
    templateName: 'comment-item-view'
});

/**
 * View for uploading files (Current version will only work with 'TourimagesController')
 */
App.FileUploadView = Ember.View.extend({
    templateName: 'fileupload-view',
    change: function(evt) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var self = this;
            var input = evt.target;
            if (input.files) {
                for(var i = 0; i < input.files.length; i++){
                    self.readFile(input.files[i]);
                }
            }
        } else {
            App.Util.log('The File APIs are not fully supported in this browser.');
        }
    },
    readFile: function(file){
        if(file){
            var controller = this.get('controller');
            var reader = new FileReader();

            reader.onloadend = function() {
                var tempImg = new Image();
                tempImg.src = reader.result;
                
                tempImg.onload = function() {
             
                    var MAX_WIDTH = 1024;
                    var MAX_HEIGHT = 768;
                    var tempW = tempImg.width;
                    var tempH = tempImg.height;
                    if (tempW > tempH) {
                        if (tempW > MAX_WIDTH) {
                           tempH *= MAX_WIDTH / tempW;
                           tempW = MAX_WIDTH;
                        }
                    } else {
                        if (tempH > MAX_HEIGHT) {
                           tempW *= MAX_HEIGHT / tempH;
                           tempH = MAX_HEIGHT;
                        }
                    }
             
                    var canvas = document.createElement('canvas');
                    canvas.width = tempW;
                    canvas.height = tempH;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, tempW, tempH);
                    var dataURL = canvas.toDataURL("image/jpeg");

                    controller.addImageForUpload(dataURL);
                };
            };
            
            reader.readAsDataURL(file);
        }
    },
    actions: {
        openFileDialog: function(){
            $(fileInputElement).click();
        }
    }
});