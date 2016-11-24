import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Component.extend({
    alert: Ember.inject.service(),
    login: Ember.inject.service(),
    store: Ember.inject.service(),
    user: null,
    reviews: [],

    didInsertElement: function() {
        var self = this;
        self.user = self.get("login").get("currentUser");
        self.set("isLoadingReviews", true);

        self.store.findQuery("tourItem", { status: Fixtures.TourStatus.IN_REVIEW }).then(function (tours) {
            self.set("reviews", tours);
            self.set("isLoadingReviews", false);

        }, function (err) {
            if(err.status === 401) {
                self.get("login").send("removeToken");
                self.get("alert").showErrorMessage("Couldn't load tours in review. Are you logged in? ");
            }
            else {
                self.get("alert").showErrorMessage("Sorry, an error occured when loading tours in review.");    
            }

            self.set("isLoadingReviews", false);
            console.log(err);
        });
    }
});
