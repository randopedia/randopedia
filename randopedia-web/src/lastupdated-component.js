App.LastupdatedComponentComponent = Ember.Component.extend({
    elementId : 'lastUpdated',
    classNames : ['lastUpdated'],
    tours : null,
    
    setup : function() {
        var tours = this.store.find('tourItem', {status : App.Fixtures.TourStatus.LAST_UPDATED});
        this.set('tours', tours);
    }.on('didInsertElement')


});
