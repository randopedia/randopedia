App.TagseditorComponentComponent = Ember.Component.extend({
    tags: null,
    selectedTags: null,
    loading: true,

    setup: function () {
        var self = this;

        setTimeout(function () {
            self.initSelect();
            self.set("loading", false);
        }, 750);

    }.on("didInsertElement"),

    initSelect: function() {
        var self = this;
        var selectbox = $(".tagseditor-select");

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