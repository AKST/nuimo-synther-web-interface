import Ember from 'ember';

export function roundDown([value, roundDown = 0]) {
  const x = Math.pow(10, roundDown);
  return Math.round(value * x) / x;
}

export default Ember.Helper.helper(roundDown);
