import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Component.extend({
    alert: Ember.inject.service(),
    login: Ember.inject.service(),
    store: Ember.inject.service(),
    user: null,
    drafts: [],
    updates: [],
    isLoadingDrafts: false,
    isLoadingUpdates: false,

    didInsertElement: function() {
        var self = this;
        self.user = self.get("login").get("currentUser");
        self.set("isLoadingDrafts", true);
        self.set("isLoadingUpdates", true);

        self.get("store").query("tourItem", { status: Fixtures.TourStatus.DRAFT }).then(function (tours) {
            self.set("drafts", tours);
            self.set("isLoadingDrafts", false);
        }, function(err) {
            if(err.status === 401) {
                self.get("login").send("removeToken");
                self.get("alert").showErrorMessage("An error occured when loading your drafts, are you logged in?");

            } else {
                self.get("alert").showErrorMessage("Sorry, an error occured when loading your drafts.");
            }

            self.set("isLoadingDrafts", false);
            console.log(err);
        });
 
        self.get("store").query("tourItem", { usersTours: true }).then(function (tours) {
            self.set("updates", tours);
            self.set("isLoadingUpdates", false);
        }, function (err) {
            if(err.status === 401) {
                self.get("login").send("removeToken");
                self.get("alert").showErrorMessage("An error occured when loading tours, are you logged in?");
            
            } else {
                self.get("alert").showErrorMessage("An error occured when loading tours.");
            }

            self.set("isLoadingUpdates", false);
            console.log(err);
        });
    }
});
