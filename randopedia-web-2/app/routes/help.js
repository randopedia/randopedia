import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
    language: service(),

    setupController(controller /*, models */) {
        controller.set('language', this.get('language'));
    }
});
