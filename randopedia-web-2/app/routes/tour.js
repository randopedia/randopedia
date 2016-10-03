import Ember from 'ember';

export default Ember.Route.extend({
    model(/* params */) {
        // return this.get('store').findRecord('tour', params.tour_id);

        return {
            "_id": "52936377e4b04666a6a2bcfe",
            "clientId": "nordre_soleibotntind__north_east_colouir",
            "status": 1,
            "elevationGain": 800,
            "elevationLoss": 800,
            "grade": 4,
            "mapGeoJson": {
                "features": [{
                    "geometry": {
                        "coordinates": [7.787997722625732, 61.452378034636375],
                        "type": "Point"
                    },
                    "properties": {
                        "name": "Summit point"
                    },
                    "rando_type": 20,
                    "type": "Feature"
                }],
                "type": "FeatureCollection"
            },
            "name": "Nordre Soleibotntind, north-east colouir",
            "shortDescription": "Long, steep and spectacular colouir in Ringsdalen valley",
            "timingMax": 6,
            "timingMin": 5,
            "id": "nordre_soleibotntind__north_east_colouir",
            "itinerary": "La lal lalal lala la!",
            "hazardsDescription": "oh it's dangerous, dude",
            "haveHazards": true,
            "accessPoint": "start here"
        };
    }
});
