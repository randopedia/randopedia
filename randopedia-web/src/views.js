App.ApplicationView = Ember.View.extend({
    classNames: ['app-root-view'],
    didInsertElement: function() {
//        $(document).foundation();
//        $(document).foundation('section');
//        $(document).foundation('reveal', {
//            animation: 'fade',
//            closeOnBackgroundClick: false
//        });
        
        // Set the negative margin on the top menu for slide-menu pages (visible for small screens)
        var $selector1 = $('#topMenu'), events = 'click.fndtn';
        if ($selector1.length > 0){
            $selector1.css("margin-top", $selector1.height() * -1);
        }
    }
});

App.LoginView = Ember.View.extend({
    templateName: 'login-view',
    actions: {
        loginWithFacebook: function() {
            this.get('controller.controllers.login').send('loginWithFacebook');
            this.closeLoginDropdown();
        },
        loginWithGoogle: function() {
            this.get('controller.controllers.login').send('loginWithGoogle');
            this.closeLoginDropdown();
        },
    },
    closeLoginDropdown: function() {
        if ($('#loginDropdown').hasClass('open')) {
             $('#toggleLoginDropdown').trigger('click');
        }
        if($('#loginReveal')) {
            $('#loginReveal').foundation('reveal', 'close');
        }
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
    actions: {
        saveArea: function() {
            if(this.get('controller').validate() === true){
                $('#confirmPublishAreaReveal').foundation('reveal', 'open');  
            }
            else {
                $('#validationErrorsAreaReveal').foundation('reveal', 'open');
            }  
        },
        startCancelingEdit: function() {
            if(this.get('controller').get('isDirty'))  {
                $('#discardChangesAreaReveal').foundation('reveal', 'open');
            } else {
                this.get('controller').send('cancelEdit');
            }
        },
        confirmDiscardChanges: function() {
            $('#discardChangesAreaReveal').foundation('reveal', 'close');
            this.get('controller').send('cancelEdit');
        },
        closeConfirmDiscardChangesDialog: function() {
            $('#discardChangesAreaReveal').foundation('reveal', 'close');
        },         
        confirmSaveArea: function() {
            this.get('controller').send('saveArea'); 
            this.send('closeConfirmPublishAreaDialog');
        },
        closeConfirmPublishAreaDialog: function() {
            $('#confirmPublishAreaReveal').foundation('reveal', 'close');
        },
        
        openAddSubAreaDialog: function() {
            this.get('controller').send('startAddingSubArea');
            this.openAddSubArea();
        },
        cancelAddSubAreaDialog: function() {
            this.get('controller').send('cancelAddSubArea');
            this.closeAddSubArea();
        },
        addSubArea: function() {
            this.get('controller').send('addSubArea');
            this.closeAddSubArea();
        },
        
        closeValidationErrorsDialog: function() {
            $('#validationErrorsAreaReveal').foundation('reveal', 'close');
        },
    },
    openAddSubArea: function() {
        $('#addSubAreaReveal').foundation('reveal', 'open');
    },
    closeAddSubArea: function() {
        $('#addSubAreaReveal').foundation('reveal', 'close');
    }
});

App.AreaItemsView = Ember.View.extend({
    templateName: 'browse-items-view',
    tagName: 'ul',
    classNames: ['areas']
});

App.AreaItemView = Ember.View.extend({
    templateName: 'browse-item-view',
    tagName: 'li',
    classNames: ['area'],
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

App.BrowseView = Ember.View.extend({
    didInsertElement : function() {
        $(document).foundation('section');
    }
});

App.AreaPickerView = Ember.View.extend({
   templateName: "areapicker-view",
   didInsertElement : function() {
       var self = this;
       self.get('controller').set('tempSelectedArea', this.get('controller').get('model').get('area'));
       
       $('#areaPickerReveal').foundation('reveal', {
           open: function(){
               self.get('controller').set('toplevels', null);
               self.set('loading', true);
               
               self.get('controller').store.find('toplevel').then(function(toplevels){
                   self.get('controller').set('toplevels', toplevels);
                   self.set('loading', false);
               }, function(error) {
                   App.Utils.log('Error when loading areas: ' + error);
               });
           }
       });
       
     //  console.log('AREA: ' + this.get('controller').get('model').get('area'));
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

App.TourPublishView = Ember.View.extend({
    templateName: 'tourpublish-view',
    haveValidationErrors: false,
    haveValidationWarnings: false,
    
    didInsertElement: function() {
        var self = this;
        this.get('controller').clearValidationFlags();
        $('#publishTourStep1Reveal').bind('opened', function() {
            self.set('haveValidationErrors', !self.get('controller').validateForPublish());
            self.set('haveValidationWarnings', self.get('controller').checkForValidationWarnings() > 0);
        });
    },
    
    actions: {
        continueToStep2: function() {
            if(this.get('controller.model.status') === App.Fixtures.TourStatus.DRAFT || this.get('controller.model.isNew')){
                this.get('controller').get('model').set('publishComment', 'First published');
            }
            $('#publishTourStep2Reveal').foundation('reveal', 'open');
        },
        completePublish: function() {
            this.get('controller').send('publishTour');
            this.send('closePublishTourStep2Dialog');
        },
        closePublishTourStep1Dialog: function() {
            $('#publishTourStep1Reveal').foundation('reveal', 'close');
        },
        closePublishTourStep2Dialog: function() {
            $('#publishTourStep1Reveal').foundation('reveal', 'close');
        }
    },
    
    isPublishDisabled: function() {
// UNCOMMENT TO MAKE PUBLISH COMMENT REQUIRED
//        if(!App.Validate.isNotNullOrEmpty(this.get('controller').get('model').get('publishComment'))){
//            return true;
//        }
        return false;
    }.property('controller.model.publishComment')
    
});

/**
 * View showing details of a tour
 */
App.TourDetailsView = Ember.View.extend({
    templateName: 'tourdetails-view',
    
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
    didInsertElement: function() {

        $(document).foundation('section', {
            callback: function(){
                // Hack to make sure content is loaded correctly, solves issue with Google Maps view not being rendered
                $(window).resize();
            }
        });
    },
    actions: {
        startPublishTour: function() {
            $('#publishTourStep1Reveal').foundation('reveal', 'open');
        },
        startCancelingEditTour: function() {
            if(this.get('controller').get('hasChanges'))  {
                $('#discardChangesTourReveal').foundation('reveal', 'open');
            } else {
                this.get('controller').send('cancelEditTour');
            }
        },
        confirmDiscardChanges: function() {
            $('#discardChangesTourReveal').foundation('reveal', 'close');
            this.get('controller').send('cancelEditTour');
        },
        closeConfirmDiscardChangesDialog: function() {
            $('#discardChangesTourReveal').foundation('reveal', 'close');
        },        
        toggleAdvancedOption: function() {
            this.set('showAdvancedOptions', !this.get('showAdvancedOptions'));
        },
        closeAreaPickerDialog: function() {
            $('#areaPickerReveal').foundation('reveal', 'close');
        },
        closeValidationErrorsDialog: function() {
            $('#validationErrorsTourReveal').foundation('reveal', 'close');
        },
        closeConfirmDeleteTour: function() {
            $('#confirmDeleteTourReveal').foundation('reveal', 'close');
        },
        closeConfirmDeleteImage: function() {
            $('#confirmDeleteImageReveal').foundation('reveal', 'close');
        },
        confirmAreaPickerDialog: function() {
            this.send('closeAreaPickerDialog');
        },
        confirmDeleteTour: function() {
            this.get('controller').send('deleteTour');
            this.send('closeConfirmDeleteTour');
        },
        startDeleteImage: function(image) {
            // Image is lost in the context of the reveal confirmation box, so we temporary store image to delete
            this.set('imageToDelete', image);
        },
        confirmDeleteImage: function() {
            this.get('controller').send('deleteImage', this.get('imageToDelete'));
            this.send('closeConfirmDeleteImage');
            this.set('imageToDelete', null);
        },
        closeConfirmPublishTourDialog: function() {
            $('#confirmDeleteTourReveal').foundation('reveal', 'close');
        },
        confirmPublishTour: function() {
            this.get('controller').send('publishTour');
            this.send('closeConfirmPublishTourDialog');
        },
        exitPreview: function() {
            $('#tourPreviewReveal').foundation('reveal', 'close');
            this.get('controller').send('exitPreview');
        }
    }
});

App.TextField = Ember.TextField.extend({
   attributeBindings: 'required',
   required: null,
});

/**
 * Text field that is focused when inserted in DOM
 */
App.FocusTextField = App.TextField.extend({
    becomeFocused: function() {
        this.$().focus();
    }.on('didInsertElement')
});

App.SearchTextField = App.TextField.extend({
    attributeBindings: ['placeholder'],
    placeholder: 'Search ski tours...',
    classNames: ['search-textfield'],
    insertNewline: function() {
        this.get('parentView.controller.controllers.search').send('search');
    }
});

App.TextArea = Ember.TextArea.extend({
    attributeBindings: 'maxlength',
    maxlength: null
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