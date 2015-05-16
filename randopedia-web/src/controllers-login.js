App.LoginController = Ember.ObjectController.extend({
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
        App.Alerts.showSuccessMessage('You were logged out.');
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
            
            // console.log("TOKEN: " + token);
            
            user.set('tokenExp', new Date(token.expires_in*1000));
            user.set('authenticated', false);
            self.set('isLoggingIn', true);
            
            // Save user, get updated user with id and data in response
            user.save().then(function() {
                self.set('isLoggingIn', false);
                self.set('currentUser', user);
                App.Alerts.showSuccessMessage('You were successfully logged in. ', 2000);
            }, function(error) {
                self.set('isLoggingIn', false);
                App.oauth.expireAccessToken();
                user.rollback();
                App.Alerts.showErrorMessage('An error occured when trying to log in, please try again. ');
            });            
        },
        removeToken : function() {
            var currentUser = this.get('currentUser');
            currentUser.set('authenticated', false);
            this.set('currentUser', null);
            App.oauth.expireAccessToken();
        },
    },

    isLoggedIn : function() {
        var user = this.get('currentUser');
        if(user && user.get('authenticated') === true) {
            var now = new Date();
            var tokenExp = user.get('tokenExp');
            if(tokenExp > now) {
                return true;
            }
            return false;    
        }
        else {
            return false;
        }
    }.property('currentUser.authenticated'),
});