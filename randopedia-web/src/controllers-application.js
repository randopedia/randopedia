App.ApplicationController = Ember.ArrayController.extend({
    needs: ['login', 'language', 'tourEdit'],

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
            // we do check if current page is tour edit and there's unsaved changes, this is not captured by router (as when transit away from tour edit on other links)
            var controller = this.get('controllers.tourEdit');
            if (controller && controller.get('hasChanges') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
                return;
            } 

            var pathnameWithLangCode = LocationHelper.setPathnameWithLanguageCode(language);
            LocationHelper.redirectToPathname(pathnameWithLangCode);
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
            this.send('collapseNavbar');
            this.set('showNavbarSearch', !this.get('showNavbarSearch'));

            if (this.get('showNavbarSearch')) {
                setTimeout(function () {
                    $('.search-textfield').focus();
                }, 300);
            }
        }
    }
});
