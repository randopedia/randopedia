import { inject as service } from '@ember/service';
import Component from '@ember/component';
import LocationHelper from '../utils/location-helper';

export default Component.extend({
    login: service(),
    language: service(),

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

        closeMenu: function() {
            this.send('collapseNavbar');
        },

        setlanguage: function (lang) {
            // we do check if current page is tour edit and if there is unsaved changes, this is not captured by router (as when transit away from tour edit on other links)
            //var controller = this.get('controllers.tourEdit');
            //if (controller && controller.get('hasChanges') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
            //    return;
            //}
            var pathnameWithLangCode = LocationHelper.setPathnameWithLanguageCode(lang);
            LocationHelper.redirectToPathname(pathnameWithLangCode);
        },

        logout: function () {
            this.get('login').logout();
            this.send('collapseNavbar');
        },

        collapseNavbar: function() {
            this.set('showNavbarMenu', false);
            this.set('showNavbarSearch', false);
        },

        toggleNavbarMenu: function () {
            this.set('showNavbarSearch', false);
            this.set('showNavbarMenu', !this.get('showNavbarMenu'));
        },

        toggleNavbarSearchbox: function () {
            this.set('showNavbarMenu', false);
            this.set('showNavbarSearch', !this.get('showNavbarSearch'));

            if (this.get('showNavbarSearch')) {
                setTimeout(function () {
                    $('.search-textfield').focus();
                }, 300);
            }
        }
    }
});
