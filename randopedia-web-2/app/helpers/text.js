import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({
  text : service(),

  compute (id) {
    return this.get("text").getText(id);
  }
});
