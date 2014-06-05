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

    actions: {
        requestAuthentication: function() {
            var self = this;
            
            // Create a user object and let server return a user id
            var user;
            if(!this.get('currentUser')){
                user = this.store.createRecord('user');
            } else {
                user = this.get('currentUser');
            }
            
            user.set('token', App.oauth.getAccessToken());
            var token = App.oauth.getToken();
            user.set('tokenExp', new Date(token.expires_in*1000));
            user.set('authenticated', false);
            this.set('isLoggingIn', true);
            
            // Save user, get updated user with id and data in response
            user.save().then(function() {
                self.set('isLoggingIn', false);
                self.set('currentUser', user);
            }, function(error) {
                self.set('isLoggingIn', false);
                App.oauth.expireAccessToken();
                user.rollback();
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
        if(user !== null && user.get('authenticated') === true) {
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