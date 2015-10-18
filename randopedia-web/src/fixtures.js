// Fixtures for static data

App.Fixtures = Ember.Object.create();

App.Fixtures.AreaTypes = {
    ROOT: 1,
    CONTINENT: 2,
    COUNTRY: 3,
    REGION: 4
};

App.Fixtures.TourStatus = {
    PUBLISHED: 1,
    DRAFT: 2,
    DELETED: 3,
    IN_REVIEW: 4,
    LAST_UPDATED: 5
};

App.Fixtures.MapSymbolTypes = {
    UP_DOWN_TRACK: 10,
    UP_TRACK: 11,
    DOWN_TRACK: 12,
    SUMMIT_POINT: 20,
};

App.Fixtures.MapObjectStyles = {
    DEFAULT_PATH_WIDTH: 4,
    SELECTED_PATH_WIDTH: 6,
    DEFAULT_PATH_COLOR: '#990000',
    UP_PATH_COLOR: '#343434',
    DOWN_PATH_COLOR: '#EE0000',
    SELECTED_PATH_COLOR: 'blue'
};

App.Fixtures.UndefinedString = "N/A",

App.Fixtures.TourActions = [
    Ember.Object.create({value: null, name: App.Fixtures.UndefinedString}),
    Ember.Object.create({value: 1, name: 'Created'}),
    Ember.Object.create({value: 2, name: 'Updated'}),
    Ember.Object.create({value: 3, name: 'Deleted'}),
    Ember.Object.create({value: 4, name: 'Image added'}),
    Ember.Object.create({value: 5, name: 'Image updated'}),
    Ember.Object.create({value: 6, name: 'Image deleted'}),  
    Ember.Object.create({value: 7, name: 'Published'}),  
    Ember.Object.create({ value: 8, name: 'Restored' }),
    Ember.Object.create({ value: 9, name: 'Sent to review' })
];

App.Fixtures.Grades = [
    Ember.Object.create({value: null, name: App.Fixtures.UndefinedString}),
    Ember.Object.create({value: 1, name: 'Easy'}),
    Ember.Object.create({value: 2, name: 'Fairly difficult'}),
    Ember.Object.create({value: 3, name: 'Quite difficult'}),
    Ember.Object.create({value: 4, name: 'Difficult'}),
    Ember.Object.create({value: 5, name: 'Very difficult'}),
    Ember.Object.create({value: 6, name: 'Extremly difficult'})
];

App.Fixtures.Aspects = [
    Ember.Object.create({value: null, name: App.Fixtures.UndefinedString}),
    Ember.Object.create({value: 1, name: 'N'}),
    Ember.Object.create({value: 2, name: 'NW'}),
    Ember.Object.create({value: 3, name: 'W'}),
    Ember.Object.create({value: 4, name: 'SW'}),
    Ember.Object.create({value: 5, name: 'S'}),
    Ember.Object.create({value: 6, name: 'SE'}),
    Ember.Object.create({value: 7, name: 'E'}),
    Ember.Object.create({value: 8, name: 'NE'})
];

App.Fixtures.BooleanOptions = [
    Ember.Object.create({value: false, name: 'No' }),
    Ember.Object.create({value: true, name: 'Yes'})
]; 

App.Fixtures.Months = [
    Ember.Object.create({value: null, name: App.Fixtures.UndefinedString}),
    Ember.Object.create({value: 1, name: 'January'}),
    Ember.Object.create({value: 2, name: 'February'}),
    Ember.Object.create({value: 3, name: 'Mars'}),
    Ember.Object.create({value: 4, name: 'April'}),
    Ember.Object.create({value: 5, name: 'May'}),
    Ember.Object.create({value: 6, name: 'June'}),
    Ember.Object.create({value: 7, name: 'July'}),
    Ember.Object.create({value: 8, name: 'August'}),   
    Ember.Object.create({value: 9, name: 'September'}),
    Ember.Object.create({value: 10, name: 'October'}),
    Ember.Object.create({value: 11, name: 'November'}),
    Ember.Object.create({value: 12, name: 'December'})
];

App.Fixtures.PathTypes = [
    Ember.Object.create({ value: App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK, name: 'Up/Down' }),
    Ember.Object.create({ value: App.Fixtures.MapSymbolTypes.UP_TRACK, name: 'Up' }),
    Ember.Object.create({ value: App.Fixtures.MapSymbolTypes.DOWN_TRACK, name: 'Down' })
];

App.Fixtures.Countries = [
    Ember.Object.create({ value: null, name: "Other / Not set" }),
    Ember.Object.create({ value: "AND", name: "Andorra" }),
    Ember.Object.create({ value: "ARG", name: "Argentina" }),
    Ember.Object.create({ value: "AUS", name: "Australia" }),
    Ember.Object.create({ value: "AUT", name: "Austria" }),
    Ember.Object.create({ value: "BGR", name: "Bulgaria" }),
    Ember.Object.create({ value: "CAN", name: "Canada" }), 
    Ember.Object.create({ value: "CHL", name: "Chili" }),
    Ember.Object.create({ value: "FIN", name: "Finland" }),
    Ember.Object.create({ value: "FRA", name: "France" }),
    Ember.Object.create({ value: "GEO", name: "Georgia" }),
    Ember.Object.create({ value: "DEU", name: "Germany" }),
    Ember.Object.create({ value: "GRL", name: "Greenland" }),
    Ember.Object.create({ value: "ISL", name: "Iceland" }),
    Ember.Object.create({ value: "ITA", name: "Italy" }),
    Ember.Object.create({ value: "IRN", name: "Iran" }),
    Ember.Object.create({ value: "LIE", name: "Liechtenstein" }),
    Ember.Object.create({ value: "MAR", name: "Morocco" }),
    Ember.Object.create({ value: "NZL", name: "New Zealand" }),
    Ember.Object.create({ value: "NOR", name: "Norway" }),
    Ember.Object.create({ value: "POL", name: "Poland" }),
    Ember.Object.create({ value: "RUS", name: "Russia" }),
    Ember.Object.create({ value: "SVN", name: "Slovenia" }),
    Ember.Object.create({ value: "ESP", name: "Spain" }),
    Ember.Object.create({ value: "SWE", name: "Sweden" }),
    Ember.Object.create({ value: "CHE", name: "Switzerland" }),
    Ember.Object.create({ value: "USA", name: "USA" })
];

// Resolve method

App.Fixtures.resolveNameFromValue = function(fixture, value){
    var fixtureObject;
    
    switch(fixture){
    case 'Grades':
        fixtureObject = App.Fixtures.Grades;
        break;
    case 'DangerGrades':
        fixtureObject = App.Fixtures.DangerGrades;
        break;
    case 'Aspects':
        fixtureObject = App.Fixtures.Aspects;
        break;
    case 'BooleanOptions':
        fixtureObject = App.Fixtures.BooleanOptions;
        break;
    case 'Months':
        fixtureObject = App.Fixtures.Months;
        break;
    case 'TourActions':
        fixtureObject = App.Fixtures.TourActions;
        break;
    case "Countries":
        fixtureObject = App.Fixtures.Countries;
        break;
    default:
        return App.Fixtures.UndefinedString;
    }
    
    for(var i = 0; i < fixtureObject.length; i++) {
        if (fixtureObject[i].value === value){
            return fixtureObject[i].name;
        }
    }
    
    return this.UndefinedString;
};


// Handlebars helpers that resolves names

Ember.Handlebars.registerBoundHelper('resolveGradeName', function (value) {
    return App.Fixtures.resolveNameFromValue('Grades', value);
});

Ember.Handlebars.registerBoundHelper('resolveDangerGradeName', function (value) {
    return App.Fixtures.resolveNameFromValue('DangerGrades', value);
});

Ember.Handlebars.registerBoundHelper('resolveAspectName', function (value) {
    return App.Fixtures.resolveNameFromValue('Aspects', value);
});

Ember.Handlebars.registerBoundHelper('resolveBooleanOptionName', function (value) {
    return App.Fixtures.resolveNameFromValue('BooleanOptions', value);
});

Ember.Handlebars.registerBoundHelper('resolveMonthName', function (value) {
    return App.Fixtures.resolveNameFromValue('Months', value);
});

Ember.Handlebars.registerBoundHelper('resolveTourAction', function (value) {
    return App.Fixtures.resolveNameFromValue('TourActions', value);
});

Ember.Handlebars.registerBoundHelper("resolveCountryName", function (value) {
    return App.Fixtures.resolveNameFromValue("Countries", value);
});
