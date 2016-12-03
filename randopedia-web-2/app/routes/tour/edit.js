import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        willTransition(transition) {         
            var model = this.get('controller').get('model');
            if(model.get('hasDirtyAttributes') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
                transition.abort(); 
            } else { 
                return true;
            }    
        }
    }     
});
