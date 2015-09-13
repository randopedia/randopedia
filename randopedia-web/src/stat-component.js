App.StatComponentComponent = Ember.Component.extend({
    elementId : 'stats',
    classNames : ['stats'],
    stat : null,

    setup : function() {
        var stat = this.get('stat');
        this.set('stat', stat);
        console.log(stat);
    }.on('didInsertElement')


});
