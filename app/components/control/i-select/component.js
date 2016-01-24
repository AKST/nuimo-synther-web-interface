import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['n__c--control__i-select'],

  classNS: '',

  options: null,

  label: '',

  onSelect: null,

  actions: {
    onSelect (update) {
      const { target: { selectedIndex } } = update;
      const selected = update.target[selectedIndex].value;
      const option   = this.get('options')[selected];
      const callback = this.get('onSelect');

      if (callback != null) {
        callback(option.value);
      }
    },
  },
});
