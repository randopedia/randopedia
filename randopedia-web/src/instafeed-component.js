App.InstafeedComponentComponent = Ember.Component.extend({
    instagramClientId: "772df9d235554f3eacd13196e0f8302d",
    loading: true,
    tagName: null,
    point: null,

    setup: function () {
        this.initInstafeed();

    }.on("didInsertElement"),

    initJssorSlider: function (containerId) {
        var options = {
            $AutoPlay: false, //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
            $AutoPlaySteps: 4, //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
            $AutoPlayInterval: 4000, //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
            $PauseOnHover: 1, //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $ArrowKeyNavigation: true, //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
            $SlideDuration: 160, //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
            $MinDragOffsetToSlide: 20, //[Optional] Minimum drag offset to trigger slide , default value is 20
            $SlideWidth: 200, //[Optional] Width of every slide in pixels, default value is width of 'slides' container
            //$SlideHeight: 150,//[Optional] Height of every slide in pixels, default value is height of 'slides' container
            $SlideSpacing: 3, //[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 4, //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
            $ParkingPosition: 0, //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1, //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
            $PlayOrientation: 1, //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 1, //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

            $BulletNavigatorOptions: { //[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$, //[Required] Class to create navigator instance
                $ChanceToShow: 2, //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 0, //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1, //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1, //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 0, //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 0, //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
            },

            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$, //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 1, //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2, //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 4 //[Optional] Steps to go for each navigation request, default value is 1
            }
        };

        var jssor_slider = new $JssorSlider$(containerId, options);

        //responsive code begin
        function ScaleSlider() {
            var bodyWidth = document.body.clientWidth;
            if (bodyWidth)
                jssor_slider.$ScaleWidth(Math.min(bodyWidth, 809));
            else
                window.setTimeout(ScaleSlider, 30);
        }

        ScaleSlider();

        $Jssor$.$AddEvent(window, "load", ScaleSlider);
        $Jssor$.$AddEvent(window, "resize", $Jssor$.$WindowResizeFilter(window, ScaleSlider));
        $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
        // responsive code end
    },

    initInstafeed: function () {
        var self = this;
        var url;
        var data = {
            count: 20,
            client_id: self.get("instagramClientId")
        };

        if (self.get("tagName")) {
            url = "https://api.instagram.com/v1/tags/" + self.get("tagName") + "/media/recent";

        } else if(self.get("point")) {
            url = "https://api.instagram.com/v1/media/search";
            data.lat = self.get("point").lat;
            data.lng = self.get("point").lng;

        } else {
            return;
        }

        $.ajax({
            url: url,
            dataType: "jsonp",
            type: "GET",
            data: data,
            success: function (res) {
                if (!res.data) {
                    return;
                }

                for (var x in res.data) {
                    if (res.data.hasOwnProperty(x)) {
                        $("#instafeed_slider_images_container").append("<div><img u='image' src=\"" + res.data[x].images.thumbnail.url + "\"></div>");
                    }
                }
                if (res.data.length > 0) {
                    self.initJssorSlider("instafeed_container");
                }
            },
            error: function (res) {
                console.log(res);
            }
        });
    }
});