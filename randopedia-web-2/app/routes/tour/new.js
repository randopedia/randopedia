import Ember from 'ember';

export default Ember.Route.extend({
    model : function(params) {
        return this.get('store').createRecord('tour');
    },
    actions: {
        // TODO: ...
        // willTransition: function(transition) {
        //     var controller = this.get('controller');           
        //     if(controller.get('isDirty') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
        //         transition.abort(); 
        //     } else { 
        //         return true;
        //     }
        // }
    }   
});
