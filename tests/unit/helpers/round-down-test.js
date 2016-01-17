import { roundDown } from '../../../helpers/round-down';
import { module, test } from 'qunit';

module('Unit | Helper | round down');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = roundDown([42.222, 2]);
  assert.equal(result, 42.22);
});
