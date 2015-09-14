App.ApplicationView = Ember.View.extend({
    showNavbarSearch: false
});

App.LoginModalView = Ember.View.extend({
    templateName: 'login-modal-view',
    actions: {
        loginWithFacebook: function() {
            this.get('controller.controllers.login').loginWithFacebook();
            this.closeModal();
        },
        loginWithGoogle: function() {
            this.get('controller.controllers.login').loginWithGoogle();
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
    actions: {
        previousSlide: function () {
            this.$().carousel('prev');
        },
        nextSlide: function () {
            this.$().carousel('next');
        },
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
            template: Ember.Handlebars.compile('<img {{bind-attr src="view.content.imageFile"}} alt=""/><div class="carousel-caption"><p>{{view.content.caption}}</p></div>')
        })
    }),
    haveMoreThanOneImage: function() {
        return this.get('content.length') > 1;
    }.property('content'),
});

App.TourDetailsView = Ember.View.extend({
    templateName: 'tourdetails-view',
    
    didInsertElement: function() {
        var self = this;
        
        // hack to give page time to load before evaluating the isIncomplete status
        setTimeout(function () {
            self.get('controller').checkIfIncomplete();
        }, 1500);
        // check status directly if tour is already marked as incomplete
        if (self.get('controller').get('isIncomplete')) {
            self.get('controller').checkIfIncomplete();
        }
    },
});

// TODO: Rewrite as component
App.TourItemView = Ember.View.extend({
    templateName: 'touritem-view'
});

App.TourEditView = Ember.View.extend({
    templateName: 'touredit-view',
    showAdvancedOptions: false,
    haveValidationErrors: false,
    haveValidationWarnings: false,
    aspects: [],
    
    didInsertElement: function() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // Hack to make sure content is loaded correctly, solves issue with Google Maps view not being rendered
            $(window).resize();
        });

        $('.info').popover({placement: 'auto'});
        
        $(".tags-editor").select2({
            tags: true,
            tokenSeparators: [',', ' '],
            multiple: true
        });

        this.set("aspects", App.Fixtures.Aspects);
    },
       
    actions: {
        startPublishTour: function () {
            this.set('haveValidationErrors', !this.get('controller').validateForPublish());
            this.set('haveValidationWarnings', this.get('controller').checkForValidationWarnings() > 0);
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

App.SearchTextView = Ember.TextField.extend({
    attributeBindings: ['placeholder'],
    placeholder: 'Search ski tours...',
    classNames: ['form-control','search-textfield'],
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

    readFile: function (file) {
        var self = this;

        if (file) {
            var reader = new FileReader();
            reader.onloadend = function() {
                self.saveImage(reader);
            };
            reader.readAsDataURL(file);
        }
    },

    saveImage: function (reader) {
        var maxWidth = 1920;
        var maxHeight = 1080;

        var controller = this.get('controller');

        var tempImg = new Image();
        tempImg.src = reader.result;

        tempImg.onload = function () {
            var width = tempImg.width;
            var height = tempImg.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(tempImg, 0, 0, width, height);
            var dataUrl = canvas.toDataURL("image/jpeg");
            controller.addImageForUpload(dataUrl);
        };
    },

    actions: {
        openFileDialog: function(){
            $('#fileInputElement').click();
        }
    }
});
