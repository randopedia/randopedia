App.TagseditorComponentComponent = Ember.Component.extend({
    tags: null,
    selectedTags: null,

    setup: function () {

        var self = this;
        var identifier = ".tags-editor";

        $(identifier).select2({
            tags: true,
            tokenSeparators: [',', ' '],
            multiple: true
        });

        function updateTags() {
            self.sendAction("action", self.get("selectedTagObjects"));
        }
        $(identifier).on("select2:select", updateTags);
        $(identifier).on("select2:unselect", updateTags);

    }.on("didInsertElement"),

    getTagsFromNameArray: function (tagNames, tags) {
        var res = [];
        tagNames.forEach(function (name) {
            var tag = tags.findBy("name", name);
            if (tag) {
                res.push(tag);
            }
        });
        return res;
    },

    selectedTagObjects: function () {
        console.log("DEBUG - selectedTags changed!");
        this.get("selectedTags").forEach(function (item) {
            console.log("DEBUG - selectedTags tag " + item);
        });
        return this.getTagsFromNameArray(this.get("selectedTags"), this.get("tags"));
    }.property("selectedTags"),
});
