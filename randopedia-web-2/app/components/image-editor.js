import Ember from 'ember';

export default Ember.Component.extend({
    login: Ember.inject.service(),
    store: Ember.inject.service(),
    alert: Ember.inject.service(),

    change: function (evt) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var self = this;
            var input = evt.target;

            if (input.files) {
                for(var i = 0; i < input.files.length; i++){
                    self.readFile(input.files[i]);
                }
            }

        } else {
            console.log('The File APIs are not fully supported in this browser.');
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
        var self = this;
        var maxWidth = 1920;
        var maxHeight = 1080;

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

            self.set("newImage", self.get('store').createRecord("image", {
                imageData: dataUrl,
                tour: self.get('tour')
            }));
        };
    },

    actions: {
        openFileDialog: function() {
            $('#fileInputElement').click();
        },

        saveNewImage: function () {
            var self = this;

            if(self.get("havePendingOperations")) {
                return;
            }
            
            self.set("havePendingOperations", true);
            self.get("newImage").save().then(
                function() {
                    self.set("newImage", null);
                    self.set("havePendingOperations", false);
                    self.get("tour").reload();
                    self.get('alert').showSuccessMessage("Image was successfully added.");
                }, 
                function(error) {
                    var status = error.status;
                    if(status === 401) {
                        self.get("login").send("removeToken");
                        self.get('alert').showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else if (status === 413) {
                        self.get('alert').showErrorMessage("Couldn't save the image, it's too big. Max image file size allowed is 15MB. ");
                    }
                    else {
                        self.get('alert').showErrorMessage("Sorry, an error occured when trying to save the image, please try again. ");
                    }

                    self.set("havePendingOperations", false);
                }
            );
        },   

        saveImage: function (image) {
            var self = this;

            if(self.get("havePendingOperations")) {
                return;
            }
            
            self.set("havePendingOperations", true);
            image.save().then(
                function() {
                    self.get("tour").reload();
                    self.set("havePendingOperations", false);
                    self.get('alert').showSuccessMessage("Image was successfully saved. ");
                }, 
                function(error) {
                    var status = error.status;
                    if (status === 401) {
                        self.get("controllers.login").send("removeToken");
                        self.get('alert').showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else {
                        self.get('alert').showErrorMessage("An error occured when saving the image, please try again. ");
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
                    self.get('alert').showSuccessMessage("Image was successfully deleted. ");
                },
                function(error) {
                    var status = error.status;
                    if(status === 401) {
                        self.get("login").send("removeToken");
                        self.get('alert').showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
                    }
                    else {
                        self.get('alert').showErrorMessage("An error occured when deleting the image, please try again. ");
                    }
                    self.set("havePendingOperations", false);
                }
            );
        },

        removeNewImage: function() {
            this.set("newImage", null);
        }
    },

    hasNewImage: Ember.computed('newImage', function() {
        return this.get("newImage");
    })

});
