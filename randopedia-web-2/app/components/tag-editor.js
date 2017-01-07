import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    tags: null,
    selectedTags: null,
    loading: true,

    didInsertElement() {
        var self = this;

        self.get("store").findAll('tag').then(function(tags) {
            self.set("tags", !tags ? [] : tags);
            self.initSelectBox();
            self.set("loading", false);

        }, function(err) {
            self.get("alert").showErrorMessage("Sorry, an error occured when loading existing tags.");
            self.set("loading", false);
            console.log(err);
        });
    },

    initSelectBox: function() {
        var self = this;
        var selectbox = $(".tag-editor");
        var data = [];

        self.get("tags").sortBy("name").forEach(function (tag) {
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
