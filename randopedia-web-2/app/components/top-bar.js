import Ember from 'ember';

export default Ember.Component.extend({
    login: Ember.inject.service(),
    language: Ember.inject.service(),

    actions: {
        topbarmenulink: function (routeName) {
            if(!routeName) {
                return;
            }

            if(routeName === 'index'){
                this.send('gotoindex');
            
            } else if(routeName === 'collapseNavbar') {
                // Dummy for collapsing navbar
            
            } else {
                this.get("router").transitionTo(routeName);
            }

            this.send('collapseNavbar');
        },

        gotoindex: function () {
            this.get("router").transitionTo("index");
        },

        setlanguage: function (language) {

            // todo ...

            // we do check if current page is tour edit and if there is unsaved changes, this is not captured by router (as when transit away from tour edit on other links)
            //var controller = this.get('controllers.tourEdit');
            //if (controller && controller.get('hasChanges') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
            //    return;
            //} 

            //var pathnameWithLangCode = LocationHelper.setPathnameWithLanguageCode(language);
            //LocationHelper.redirectToPathname(pathnameWithLangCode);
        },
        
        logout: function () {
            this.get('controllers.login').logout();
            this.send('collapseNavbar');
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
