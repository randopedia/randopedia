App.ApplicationView = Ember.View.extend({
    showNavbarSearch: false,
    actions: {
        toggleNavbarSearchBox: function() {
            this.set('showNavbarSearch', !this.get('showNavbarSearch'));
            if(this.get('showNavbarSearch')) {
                $("body").css('padding-top', '100px');
                $("#tourMapRootElement").css('margin-top', '97px');
                //this.get('controller').send('collapseNavbar');
            } else {
                $("body").css('padding-top', '50px');
                $("#tourMapRootElement").css('margin-top', '50px');
            }
        }
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
        goToAbout: function() {
            this.get('controller').transitionToRoute('about');
        }    
    },
    closeModal: function() {
        $('#loginViewModalId').modal('hide');
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
        startCancelingEdit: function() {
            if(this.get('controller').get('isDirty'))  {
                $('#discardChangesAreaModal').modal('show');
            } else {
                this.get('controller').send('cancelEdit');
            }
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
    actions: {
        selectArea: function() {
            this.get('controller').set('tempSelectedArea', this.get('item'));
        },
        toggleExpandChildren: function() {
            this.set('isExpanded', !this.get('isExpanded'));
        },
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

App.BreadCrumbView = Ember.View.extend({
    templateName: 'breadcrumb-view'
});

App.ImageCarouselView = Ember.View.extend({    
    templateName: 'image-carousel-view',
    classNames: ['carousel', 'slide'],
    init: function() { 
        this._super.apply(this, arguments);
        // disable the data api from boostrap
        $('#image-carousel-container').off('.data-api');      
        // at least one item must have the active class, so we set the first here, and the class will be added by class binding
        var obj = this.get('content.firstObject');
        Ember.set(obj, 'isActive', true);
    },
    previousSlide: function() {
        this.$().carousel('prev');
    },
    nextSlide: function() {
        this.$().carousel('next');
    },
    didInsertElement: function() {
        this.$().carousel({
            interval: false
        });
    },
    itemsView: Ember.CollectionView.extend({        
        classNames: ['carousel-inner'],
        contentBinding: 'parentView.content',
        itemViewClass: Ember.View.extend({
            classNames: ['item'],
            classNameBindings: ['content.isActive:active'],
            template: Ember.Handlebars.compile('<img {{bindAttr src="view.content.imageFile"}} alt=""/><div class="carousel-caption"><p>{{view.content.caption}}</p></div>')
        })
    }),
    haveMoreThanOneImage: function() {
        return this.get('content.length') > 1;
    }.property('content'),
});

App.TourDetailsView = Ember.View.extend({
    templateName: 'tourdetails-view',
    
    didInsertElement: function() {
        $('#incompleteInfoButtonId').popover();
    },
});

App.TourItemView = Ember.View.extend({
    templateName: 'touritem-view'
});

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
          
        $('.info').popover({placement: 'left right auto'});
    },
    actions: {
        startPublishTour: function() {
            $('#publishTourStep1Modal').modal('show');
        },
        continueToPublishStep2: function() {
            $('#publishTourStep1Modal').modal('hide');
            $('#publishTourStep2Modal').modal('show');
        },
        confirmPublishTour: function() {
            this.get('controller').send('publishTour');
            $('#publishTourStep2Modal').modal('hide');
        },
        startCancelingEditTour: function() {
            if(this.get('controller').get('hasChanges'))  {
                $('#discardChangesTourModal').modal('show');
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

// TODO: Is this in use? Delete if not
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

// TODO: Rename to ImageUploadView
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
             
                    var MAX_WIDTH = 1920;
                    var MAX_HEIGHT = 1080;
                    var width = tempImg.width;
                    var height = tempImg.height;
                     
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    
                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(tempImg, 0, 0, width, height);
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