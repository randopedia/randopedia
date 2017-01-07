import Ember from 'ember';

export default Ember.Component.extend({
    tags: null,
    selectedTags: null,
    loading: true,

    didInsertElement() {
        var self = this;

        setTimeout(function () {
            self.initSelect();
            self.set("loading", false);
        }, 750);
    },

    initSelect: function() {
        console.debug("init");
        var self = this;
        var selectbox = $(".tag-editor");

        var data = [];

        var tags = !self.get("tags") ? [] : self.get("tags");  

        tags.sortBy("name").forEach(function (tag) {
            data.push({ id: tag.get("id"), text: tag.get("name") });
        });

        selectbox.select2({
            data: data,
            tags: true,
            multiple: true,
            tokenSeparators: [',', ' '],
        });

        selectbox.val(self.get("selectedTags")).trigger("change");

        selectbox.on("select2:select", function () {
            self.sendAction("action", selectbox.val());
        });

        selectbox.on("select2:unselect", function () {
            self.sendAction("action", selectbox.val());
        });
    }
});
