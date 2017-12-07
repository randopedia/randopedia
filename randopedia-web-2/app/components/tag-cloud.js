import Component from '@ember/component';

export default Component.extend({
    tags : [],

    didInsertElement() {
        var self = this;
        setTimeout(function () {
            self.initjQCloud();
        }, 500);
    },

    initjQCloud: function() {
        var jqTags = [];

        this.get("tags").forEach(function (tag) {
            jqTags.push({
                text: tag.get("name"),
                weight: tag.get("popularity") + 5,
                link: "/tags/" + tag.get("id")
            });
        });

        function scaleCloud() {
            var containerWidth = $(".tagcloud-component").width();
            if (containerWidth) {
                $(".tagcloud-container").width(containerWidth);

            } else {
                window.setTimeout(scaleCloud, 30);
            }

            $(".tagcloud-container").jQCloud(jqTags, {
                width: containerWidth,
                height: 300
            });
        }

        scaleCloud();

        // todo: "live" scaling doesn't work with jqCloud. width needs to be set in some other way
        //$Jssor$.$AddEvent(window, "load", scaleCloud);
        //$Jssor$.$AddEvent(window, "resize", scaleCloud);
        //$Jssor$.$AddEvent(window, "orientationchange", scaleCloud);
    }
});
