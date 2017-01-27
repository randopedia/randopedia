import Ember from 'ember';

export default Ember.Service.extend({
    alert: Ember.inject.service(),
    emberOauth2: Ember.inject.service(),
    store : Ember.inject.service(),
    currentUser: null,
    isLoggingIn: false,

    loginWithFacebook: function() {
      this.login('facebook');
    },

    loginWithGoogle: function() {
      this.login('google');
    },

    login: function(provider) {
      var emberOauth2 = this.get('emberOauth2');
      emberOauth2.setProvider(provider);
      var self = this;
      emberOauth2.authorize().then(function(response) {
        self.poll(function() {
          if(response.location.hash) {
            return true;
          } else {
            return false;
          }
        }, 2000, 150).then(function() {
          emberOauth2.trigger('redirect', response.location.hash);
          self.requestAuthentication();
          response.close();
        }).catch(function(error) {
          console.log('Polling for token timed out', error);
        });
      });
    },

    logout: function() {
        this.removeToken();
        this.get('alert').showSuccessMessage('You were logged out.');
    },

    poll : function(fn, timeout, interval) {
      var endTime = Number(new Date()) + (timeout || 2000);
      interval = interval || 100;

      var checkCondition = function(resolve, reject) {
        var result = fn();
        if(result) {
          resolve(result);
        }
        else if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject);
        }
        else {
          reject(new Error('Timed out for ' + fn + ': ' + arguments));
        }
      };
      return new Promise(checkCondition);
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

      // Save user, get updated user with id and data in response
      user.save().then(function() {
        self.set('isLoggingIn', false);
        self.set('currentUser', user);
        self.get('alert').showSuccessMessage('You were successfully logged in.', 2000);

      }).catch(function(error) {
        console.log('Error during login ', error);
        self.set('isLoggingIn', false);
        emberOauth2.expireAccessToken();
        self.get('alert').showErrorMessage('An error occured when trying to log in, please try again. ');
      });
    },

    removeToken : function() {
      var currentUser = this.get('currentUser');
      if(currentUser) {
        currentUser.set('authenticated', false);
        this.set('currentUser', null);
      }
      this.get('emberOauth2').expireAccessToken();
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

    isLoggedIn: Ember.computed('currentUser.authenticated', function() {
      var loggedIn = this.checkIfLoggedIn('facebook');  
      if(!loggedIn) {
        loggedIn = this.checkIfLoggedIn('google');
      }
      return loggedIn;
    }),

    isAdmin: Ember.computed('currentUser.authenticated', function() {
      var user = this.get('currentUser');
      if (!user || !user.get('authenticated')) {
          return false;
      }
      return user.get("userId") === "521716365" || user.get("userId") === "615412384";
    }
  )
});
