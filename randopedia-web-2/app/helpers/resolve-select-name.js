import Ember from 'ember';
import App from 'ember';
import Fixtures from '../fixtures';

export default Ember.Helper.helper(function(params) {
    var fixture = params[0];
    var value = params[1];
    var fixtureObject;

    switch(fixture){
        case 'Grades':
            fixtureObject = Fixtures.Grades;
            break;
        case 'DangerGrades':
            fixtureObject = Fixtures.DangerGrades;
            break;
        case 'Aspects':
            fixtureObject = Fixtures.Aspects;
            break;
        case 'BooleanOptions':
            fixtureObject = Fixtures.BooleanOptions;
            break;
        case 'Months':
            fixtureObject = Fixtures.Months;
            break;
        case 'TourActions':
            fixtureObject = Fixtures.TourActions;
            break;
        case "Countries":
            fixtureObject = Fixtures.Countries;
            break;
        default:
            return Fixtures.UndefinedString;
    }
    
    for(var i = 0; i < fixtureObject.length; i++) {
        if (fixtureObject[i].value === value) {
            if (App.language === Fixtures.LanguageCodes.NO && fixtureObject[i].name_no) {
                return fixtureObject[i].name_no;
            }
            return fixtureObject[i].name;
        }
    }
    
    return this.UndefinedString;
});