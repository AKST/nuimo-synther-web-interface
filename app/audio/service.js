import Ember from 'ember';

const WebAudioContext = window.AudioContext || window.webkitAudioContext;

export default Ember.Service.extend({
  __context: null,

  getContext () {
    let context = this.get('__context');
    if (context == null) {
      context = new WebAudioContext();
      this.set('__context', context);
    }
    return context;
  }
});
