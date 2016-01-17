import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('instrument/i-keyboard', 'Integration | Component | instrument/i keyboard', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{instrument/i-keyboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#instrument/i-keyboard}}
      template block text
    {{/instrument/i-keyboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
