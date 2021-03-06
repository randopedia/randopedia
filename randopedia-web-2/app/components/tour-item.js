import Component from '@ember/component';

export default Component.extend({
    actions: {
        openTour: function() {
            this.get("router").transitionTo("tour", this.get("tour.id"));
            if(this.get("tourWasOpened")) {
                this.get("tourWasOpened")();
            }
        }
    }
});
