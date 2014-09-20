App.ApplicationController = Ember.ArrayController.extend({
    needs: ['login', 'search'],
    
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
        topbarMenuLink: function(route) {
            if(route){
                if(route === 'index'){
                    this.send('goToIndex');
                } else {
                    this.transitionToRoute(route);	
                    this.send('collapseNavbar');
                }
            }
        },
        loginWithFacebook: function() {
            this.get('controller.controllers.login').send('loginWithFacebook');
        },
        loginWithGoogle: function() {
            this.get('controller.controllers.login').send('loginWithGoogle');
        },
        goToIndex: function() {
            this.get('controllers.search').clearSearchResult();
            this.transitionToRoute('index');
        },
        collapseNavbar: function() {
            if($('.navbar-toggle').css('display') !='none'){
                $(".navbar-toggle").trigger( "click" );
            }  
        }
    }
});
