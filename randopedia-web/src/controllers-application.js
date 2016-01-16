App.ApplicationController = Ember.ArrayController.extend({
    queryParams: 'lang',
    needs: ['login'],

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
    
    verifyLogin : function() {
        var token = App.oauth.getToken('facebook');

        if(token) {
            if(this.checkTokenExpired(token)) {
                token = null;
            }
        }
        if(!token) {
            token = App.oauth.getToken('google');
        }
        if(token !== null) {
            App.oauth.setProviderId(token.provider_id);
            App.oauth.init();
            if(!this.checkTokenExpired(token)) {
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
        setlanguage: function (language) {
            this.transitionTo({ queryParams: { lang: language } });
            location.reload();
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
        },
        toggleNavbarSearchbox: function () {
            this.set('showNavbarSearch', !this.get('showNavbarSearch'));

            if (this.get('showNavbarSearch')) {
                setTimeout(function () {
                    $('.search-textfield').focus();
                }, 300);
            }
        }
    }
});
