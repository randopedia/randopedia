import { computed } from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
    alert: service(),
    emberOauth2: service(),
    store : service(),
    text: service(),
    currentUser: null,
    isLoggingIn: false,

    clearAllTokens: function() {
      var emberOauth2 = this.get('emberOauth2');
      emberOauth2.setProvider('facebook');
      emberOauth2.expireAccessToken();
      emberOauth2.setProvider('google');
      emberOauth2.expireAccessToken();
    },

    loginWithFacebook: function() {
      this.login('facebook');
    },

    loginWithGoogle: function() {
      this.login('google');
    },

    login: function(provider) {
      var emberOauth2 = this.get('emberOauth2');
      var self = this;
      var handler = function(event) {
        if(event.origin === window.location.origin) {
          emberOauth2.trigger('redirect', event.data);
          self.requestAuthentication();
          event.stopPropagation();
        }
      }
      window.addEventListener("message", handler, false);
      setTimeout(function() {
        window.removeEventListener("message", handler, false);
      }, 10000);
      this.clearAllTokens();
      emberOauth2.setProvider(provider);
      emberOauth2.authorize().then(function() { });
    },

    logout: function() {
        this.removeToken();
        this.get('alert').showSuccessMessage(this.get("text").getText('login_loggedOutMsg'));
    },

    requestAuthentication: function() {
      var self = this;
      var store = self.get('store');
      var emberOauth2 = self.get('emberOauth2');

      // Create a user object and let server return a user id
      var user;
      if(!self.get('currentUser')){
          user = store.createRecord('user');
      } else {
          user = self.get('currentUser');
      }

      user.set('token', emberOauth2.getAccessToken());
      var token = emberOauth2.getToken();
      user.set('tokenExp', new Date(token.expires_in*1000));
      user.set('authenticated', false);
      self.set('isLoggingIn', true);

      // If user is not null, this will be a put/update.
      // Save user, get updated user with id and data in response
      user.save().then(function() {
        self.set('isLoggingIn', false);
        self.set('currentUser', user);
        self.get('alert').showSuccessMessage(self.get("text").getText('login_loggedInMsg'), 2000);

      }).catch(function(error) {
        console.log('error during login', error);
        self.set('isLoggingIn', false);
        emberOauth2.expireAccessToken();
        self.get('alert').showErrorMessage(self.get("text".getText("login_errorWhenLoggingIn")));
      });
    },

    removeToken : function() {
      var currentUser = this.get('currentUser');
      if(currentUser) {
        currentUser.set('authenticated', false);
        this.set('currentUser', null);
      }
      this.clearAllTokens();
    },

    checkTokenExpired : function(token) {
        if(token) {
            var expires = new Date(token.expires_in*1000);
            var now = new Date();
            if(expires > now) {
                return false;
            }
        }
        return true;
    },

    performBackgroundLogIn : function() {
      if(!this.checkIfLoggedIn('facebook')) {
        this.checkIfLoggedIn('google');
      }
    },

    checkIfLoggedIn : function(provider) {
      var emberOauth2 = this.get('emberOauth2');
      emberOauth2.setProvider(provider);

      var token = this.get('emberOauth2').getToken();
      var user = this.get('currentUser');
      if(user && user.get('authenticated') === true) {
        var now = new Date();
        var tokenExp = user.get('tokenExp');
        return tokenExp > now;

      } else {
        if(!this.checkTokenExpired(token)) {
          this.requestAuthentication();
          return true;

        } else {
          return false;
        }
      }
    },

    isLoggedIn: computed('currentUser.authenticated', function() {
      var user = this.get('currentUser');
      if(user && user.get('authenticated')) {
        var now = new Date();
        var tokenExp = user.get('tokenExp');
        return tokenExp > now;
      }
      return false;
    }),

    isAdmin: computed('currentUser.authenticated', function() {
      var user = this.get('currentUser');
      if (!user || !user.get('authenticated')) {
          return false;
      }
      return user.get("userId") === "521716365" || user.get("userId") === "615412384";
    }
  )
});
