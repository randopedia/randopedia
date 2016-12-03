import Ember from 'ember';

export default Ember.Component.extend({
    login: Ember.inject.service(),

    actions: {
        loginWithFacebook: function() {
            this.get("login").loginWithFacebook();
            this.closeModal();
        },

        loginWithGoogle: function() {
            this.get("login").loginWithGoogle();
            this.closeModal();
        }
    },

    closeModal: function() {
        $('#loginViewModalId').modal('hide');
    }
});
