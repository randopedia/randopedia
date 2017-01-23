import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Helper.extend({
    language: Ember.inject.service(),
  
    compute (params) {
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
                if (this.get("language").isNorwegian && fixtureObject[i].name_no) {
                    return fixtureObject[i].name_no;
                }
                return fixtureObject[i].name;
            }
        }

        return this.UndefinedString;
    }
});