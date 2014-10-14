// Models

App.Stats = DS.Model.extend({
    publishedTours : DS.attr('number'),
    publishedAreas : DS.attr('number'),
    deadAreas: DS.attr('number'),
    tourDrafts: DS.attr('number'),
    registeredUsers: DS.attr('number')
});

App.Toplevel = DS.Model.extend({
    area : DS.belongsTo('area'),
    name : DS.attr('string')
});

App.SearchResult = DS.Model.extend({
    tours : DS.hasMany('tour')
});

App.User = DS.Model.extend({
    token : DS.attr('string'),
    tokenExp : DS.attr('date'),
    userName : DS.attr('string'),
    userId : DS.attr('string'),
    longLivedToken : DS.attr('string'),
    authenticated : DS.attr('boolean')
});

App.Area = DS.Model.extend({
    name : DS.attr('string'),
    description : DS.attr('string'),
    parent : DS.belongsTo('area', { inverse: 'children' }),
    children : DS.hasMany('area', { inverse: 'parent', async: true }),
    hasTours: DS.attr('boolean'),
    tours: DS.hasMany('tour', { async: true }),
    nbrTours: DS.attr('number'),
    areaType: DS.attr('number'),
    
    // Computed properties
    isRootArea: function() {
        return (this.get('areaType') === App.Fixtures.AreaTypes.ROOT);
    }.property('areaType'),
    
    isReadOnlyArea: function() {
        if(this.get('areaType') === App.Fixtures.AreaTypes.ROOT || 
           this.get('areaType') === App.Fixtures.AreaTypes.CONTINENT){
            return true;
        }
        return false;
    }.property('areaType'),
});

App.Maps = Ember.Object.create();

App.Image = DS.Model.extend({
    imageData: DS.attr('string'),
        imageFile: DS.attr('string'),
    tour: DS.belongsTo('tour', {inverse: 'images'}),
    caption: DS.attr('string'),
    isPortfolio: DS.attr('boolean'),
    
    // Computed properties
    isUpdateDisabled: function() {
        return !this.get('isDirty') || this.get('isSaving');
    }.property('isDirty', 'isSaving'),
    
    isDeleteDisabled: function() {
        return this.get('isSaving');
    }.property('isSaving')
});

App.Comment = DS.Model.extend({
    comment : DS.attr('string'),
    userId : DS.attr('string'),
    userName : DS.attr('string'),
    time : DS.attr('number'),
    tour : DS.belongsTo('tour')
});

App.Action = DS.Model.extend({
    time: DS.attr('number'),
    userId : DS.attr('string'),
    userName : DS.attr('string'),
    comment : DS.attr('string'),
    type: DS.attr('number'),
    tour: DS.belongsTo('tour')
});

App.Tag = DS.Model.extend({
    name: DS.attr('string'),
    value: DS.attr('number'),
    tours: DS.hasMany('tour', { async: true })
});

App.Tour = DS.Model.extend({
    name: DS.attr('string'),
    area: DS.belongsTo('area'),
    shortDescription: DS.attr('string'),
    elevationGain: DS.attr('number'),
    elevationLoss: DS.attr('number'),
    elevationMax: DS.attr('number'),
    timingMin: DS.attr('number'),
    timingMax: DS.attr('number'),
    grade: DS.attr('number'),
    haveHazards: DS.attr('boolean'),
    hazardsDescription: DS.attr('string'),
    degreesMax: DS.attr('string'),
    requiresTools: DS.attr('boolean'),
    toolsDescription: DS.attr('string'), 
    aspect: DS.attr('number'),
    timeOfYearFrom: DS.attr('number'),
    timeOfYearTo: DS.attr('number'),
    accessPoint: DS.attr('string'),
    itinerary: DS.attr('string'),
    mapPaths: DS.attr('raw'),
    mapGeoJson: DS.attr('raw'),
    tags: DS.attr('raw'),
    portfolioImage: DS.belongsTo('image'),
    images: DS.hasMany('image', { async: true }),
    comments: DS.hasMany('comment', { async : true }),
    actions: DS.hasMany('action', { async: true }),
    status: DS.attr('number'),
    publishComment: DS.attr('string')
});
