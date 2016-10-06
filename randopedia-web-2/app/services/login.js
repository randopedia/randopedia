import Ember from 'ember';

export default Ember.Service.extend({
    alert: Ember.inject.service(),
    currentUser: null,
    isLoggingIn: false,
    
    loginWithFacebook: function() {
        App.oauth.setProviderId('facebook');
        App.oauth.init();
        App.oauth.authorize();
    },
    
    loginWithGoogle: function() {
        App.oauth.setProviderId('google');
        App.oauth.init();
        App.oauth.authorize();
    },

    logout: function() {
        this.send('removeToken');
        alert.showSuccessMessage('You were logged out.');
    },

    actions: {
        requestAuthentication: function() {
            var self = this;
            
            // Create a user object and let server return a user id
            var user;
            if(!self.get('currentUser')){
                user = self.store.createRecord('user');
            } else {
                user = self.get('currentUser');
            }
            
            user.set('token', App.oauth.getAccessToken());
            var token = App.oauth.getToken();

            user.set('tokenExp', new Date(token.expires_in*1000));
            user.set('authenticated', false);
            self.set('isLoggingIn', true);
            
            // Save user, get updated user with id and data in response
            user.save().then(function() {
                self.set('isLoggingIn', false);
                self.set('currentUser', user);
                alert.showSuccessMessage('You were successfully logged in. ', 2000);

            }, function(error) {
                self.set('isLoggingIn', false);
                App.oauth.expireAccessToken();
                user.rollback();
                alert.showErrorMessage('An error occured when trying to log in, please try again. ');
            });            
        },

        removeToken : function() {
            var currentUser = this.get('currentUser');
            if(currentUser) {
                currentUser.set('authenticated', false);
                this.set('currentUser', null);
            }
            App.oauth.expireAccessToken();
        },
    },

    isLoggedIn: Ember.computed('currentUser.authenticated', function() {
        this.set("user", {userName: "Björn Asplund", userId: "521716365"});
        return true;

        //var user = this.get('currentUser');
        //if(user && user.get('authenticated') === true) {
        //    var now = new Date();
        //    var tokenExp = user.get('tokenExp');
        //    return tokenExp > now;
        //}
        //else {
        //    return false;
        //}
    }),

    isAdmin: Ember.computed('currentUser.authenticated', function() {
        var user = this.get('currentUser');
        if (!user || !user.get('authenticated')) {
            return false;
        }
        return user.get("userId") === "521716365" || user.get("userId") === "615412384";
    })
});
