import Route from '@ember/routing/route';

export default Route.extend({
    model : function() {
        return this.get('store').createRecord('tour');
    },
    actions: {
        willTransition(transition) {         
            var model = this.get('controller').get('model');
            if(model.get('isNew') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
                transition.abort(); 
            } else { 
                return true;
            }    
        }
    }   
});
