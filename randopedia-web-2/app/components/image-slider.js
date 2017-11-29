import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
    images: [],

    didInsertElement() {
        this.initSlider();
    },

    initSlider: function() {
        var options = {
            $AutoPlay: false,
            $FillMode: 1,                                   //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
            $ArrowNavigatorOptions: {                       //[Optional]
                $Class: $JssorArrowNavigator$,                  //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
            },
            $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 10,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
            }
        };

        var jssor_slider1 = new $JssorSlider$("image-slider-container", options);

        //responsive code begin
        function scaleSlider() {
            var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
            if (parentWidth) {
                jssor_slider1.$ScaleWidth(Math.min(parentWidth, 1200));
            }
            else {
                window.setTimeout(scaleSlider, 30);
            }
        }

        scaleSlider();

        $(window).bind("load", scaleSlider);
        $(window).bind("resize", scaleSlider);
        $(window).bind("orientationchange", scaleSlider);
        //responsive code end
    },

    haveMoreThanOneImage: computed('images', function() {
        return this.get("images.length") > 1;
    })
});
