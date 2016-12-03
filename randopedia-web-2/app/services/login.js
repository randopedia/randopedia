import Ember from 'ember';

export default Ember.Service.extend({
    alert: Ember.inject.service(),
    emberOauth2: Ember.inject.service(),
    store : Ember.inject.service(),
    currentUser: null,
    isLoggingIn: false,

    loginWithFacebook: function() {
      var emberOauth2 = this.get('emberOauth2');
      emberOauth2.setProvider('facebook');
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
    loginWithGoogle: function() {
        //App.oauth.setProviderId('google');
        //App.oauth.init();
        //App.oauth.authorize();
    },

    logout: function() {
        this.send('removeToken');
        this.get('alert').showSuccessMessage('You were logged out.');
    },
    poll : function(fn, timeout, interval) {
      var endTime = Number(new Date()) + (timeout || 2000);
      interval = interval || 100;

      var checkCondition = function(resolve, reject) {
        // If the condition is met, we're done!
        var result = fn();
        if(result) {
          resolve(result);
        }
        // If the condition isn't met but the timeout hasn't elapsed, go again
        else if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject);
        }
        // Didn't match and too much time, reject!
        else {
          reject(new Error('timed out for ' + fn + ': ' + arguments));
        }
      };
      return new Promise(checkCondition);
    },
    requestAuthentication: function() {
      var store = this.get('store');
      var emberOauth2 = this.get('emberOauth2');
      var self = this;
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
        self.get('alert').showSuccessMessage('You were successfully logged in. ', 2000);
      }).catch(function(error) {
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
    isLoggedIn: Ember.computed('currentUser.authenticated', function() {
      //this.set("user", {userName: "Bj�rn Asplund", userId: "521716365"});
      //return true;
      //return false;
      var user = this.get('currentUser');
      if(user && user.get('authenticated') === true) {
        var now = new Date();
        var tokenExp = user.get('tokenExp');
        return tokenExp > now;
      }
      else {
        return false;
      }
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