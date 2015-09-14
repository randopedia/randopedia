App.TagseditorComponentComponent = Ember.Component.extend({
    classNames : ['tags-editor'],
    cloudTags : null,

    didInsertElement: function () {
        console.log("init");
        $(".tags-editor").select2({
            tags: true,
            tokenSeparators: [',', ' '],
            multiple: true
        });

    },

    //setup : function() {
    //    var tags = this.get('tags');
    //    console.log(tags);

    //    this.set('allTags', tags);

    //}.on('didInsertElement')

});
