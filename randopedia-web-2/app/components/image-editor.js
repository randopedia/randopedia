import Ember from 'ember';

export default Ember.Component.extend({
    
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

    addImageForUpload: function(imageData) {
        var image = this.store.createRecord("image");
        image.set("imageData", imageData);
        image.set("tour", this.get("model"));
        this.set("newImage", image);
    },    

    actions: {
        openFileDialog: function(){
            $('#fileInputElement').click();
        },

        didSelectImage: function (imageFile) {
            console.log("hey image file");
        }
    },

    hasNewImage: Ember.computed('newImage', function() {
        return this.get("newImage");
    })

});
