import Ember from 'ember';

export function classPrefixer(prefixes, { suffix = "" }) {
  return prefixes
    .filter(prefix => !!prefix)
    .map(prefix => prefix + suffix).join(' ');
}

export default Ember.Helper.helper(classPrefixer);
