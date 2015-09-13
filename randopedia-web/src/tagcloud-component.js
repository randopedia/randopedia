App.TagcloudComponentComponent = Ember.Component.extend({
    elementId : 'tagcloud',
    classNames : ['tagcloud'],
    cloudTags : null,
 
    setup : function() {
        var tags = this.get('tags');
        this.set('cloudTags', tags);
    }.on('didInsertElement')


});
