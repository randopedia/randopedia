import Ember from 'ember';

export function displayDateTime(params/*, hash*/) {
  if(!params || !params[0]) { 
    return "N/A"; 
  }
  
  var time = params[0];

  return moment(time).format("YYYY-MM-DD HH:mm");
}

export default Ember.Helper.helper(displayDateTime);
