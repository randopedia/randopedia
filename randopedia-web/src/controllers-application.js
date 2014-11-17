App.ApplicationController = Ember.ArrayController.extend({
    needs: ['login'],
    
    verifyLogin : function() {
        var token = App.oauth.getToken('facebook');
        if(!token)
            token = App.oauth.getToken('google');

        if(token !== null) {
            App.oauth.setProviderId(token.provider_id);
            App.oauth.init();
            
            var expires = new Date(token.expires_in*1000);
            var now = new Date();
            // If there is a token that is not expired in local storage, fire off a request to check validity
            if(expires > now) {
                var loginController = this.get('controllers.login');
                loginController.send('requestAuthentication');
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    },
    
    actions: {
        // TODO: Move to view
        topbarmenulink: function (route) {
            if(route){
                if(route === 'index'){
                    this.send('gotoindex');
                } else if(route === 'collapseNavbar') {
                    // Dummy for collapsing navbar
                } else {
                    this.transitionToRoute(route);
                }
                this.send('collapseNavbar');
            }
        },
        logout: function () {
            this.get('controllers.login').logout();
            this.send('collapseNavbar');
        },
        gotoindex: function () {
            this.transitionToRoute('index');
        },
        collapseNavbar: function() {
            $('.navbar-collapse').collapse('hide');
        }
    }
});
