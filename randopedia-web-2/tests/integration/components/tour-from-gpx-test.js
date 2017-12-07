import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tour-from-gpx', 'Integration | Component | tour from gpx', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tour-from-gpx}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tour-from-gpx}}
      template block text
    {{/tour-from-gpx}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
