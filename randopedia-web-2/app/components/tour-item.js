import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        openTour: function() {
            this.get("router").transitionTo("tour", this.get("tour.id"));
            if(this.get("tourWasOpened")) {
                this.get("tourWasOpened")();
            }
        }
    }
});
