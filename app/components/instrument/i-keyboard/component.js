import Ember from 'ember';
import Dialer from 'frontend/nuimo/controls/pitch_modulator';
import Monotron from 'frontend/audio/synth/monotron';

export default Ember.Component.extend({
  nuimo: Ember.inject.service('nuimo'),
  audio: Ember.inject.service('audio'),

  listenForUpdates: Ember.on('willInsertElement', function () {
    const nuimo = this.get('nuimo');

    nuimo.on('update', update => {
      console.log(update);
    });
  }),
});
