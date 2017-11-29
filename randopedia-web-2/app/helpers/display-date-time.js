import { helper } from '@ember/component/helper';

export function displayDateTime(params/*, hash*/) {
  if(!params || !params[0]) { 
    return "N/A"; 
  }
  
  var time = params[0];

  return moment(time).format("YYYY-MM-DD HH:mm");
}

export default helper(displayDateTime);
