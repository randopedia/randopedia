import { inject as service } from '@ember/service';
import Component from '@ember/component';
import Fixtures from '../utils/fixtures';

export default Component.extend({
    alert: service(),
    login: service(),
    store: service(),
    user: null,
    reviews: [],

    didInsertElement: function() {
        var self = this;
        self.user = self.get("login").get("currentUser");
        self.set("isLoadingReviews", true);

        self.get("store").query("tourItem", { status: Fixtures.TourStatus.IN_REVIEW }).then(function (tours) {
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
