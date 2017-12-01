import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    login: service(),

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
