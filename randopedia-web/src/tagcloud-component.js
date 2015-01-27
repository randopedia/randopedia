App.TagcloudComponentComponent = Ember.Component.extend({
    elementId : 'tagcloud',
    classNames : ['tagcloud'],
    cloudTags : null,
    /*
      Get an array of all tags
      Create an ember array with tag and popularity
      Popularity can be 1-5. The most popular tags is 10, least popular 1
    */

    setup : function() {
        var tags = this.get('tags');
        console.log(tags);
        this.set('cloudTags', tags);
    }.on('didInsertElement')
});
