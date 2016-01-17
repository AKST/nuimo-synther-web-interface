import Ember from 'ember';
import Dialer from 'frontend/nuimo/controls/pitch_modulator';
import Monotron from 'frontend/audio/synth/monotron';

const notes = [
  'A', 'A#', 'B', 'C', 'C#', 'D',
  'D#', 'E', 'F', 'F#', 'G', 'G#'
];

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['n__c--i-oscillator'],

  nuimo: Ember.inject.service('nuimo'),
  audio: Ember.inject.service('audio'),

  controller: null,

  note: null,
  octave: null,
  frequency: null,
  playing: null,

  gain: 0.8,

  _listenForUpdates: Ember.on('willInsertElement', function () {
    const nuimo = this.get('nuimo');
    const context = this.get('audio').getContext();
    const monotron = Monotron.makeSynth(context);
    const controller = new Dialer(monotron);

    monotron.connect(context.destination);
    controller.gain = this.get('gain');
    this.set('controller', controller);

    this._updateWithController(controller);
    nuimo.on('update', update => {
      controller.withUpdate(update);
      this._updateWithController(controller);
    });
  }),

  _updateWithController(controller) {
    const repr = controller.repr();
    this.setProperties({
      playing: repr.playing,
      frequency: Math.floor((repr.note.pitch * 100)) / 100,
      octave: repr.note.position.octave,
      note: notes[repr.note.position.tone],
    });
  },

  actions: {
    update (metric, amount) {
      this.set(metric, amount);
    }
  },

  //
  // OBSERVERS
  //

  trackGain: Ember.observer('gain', function () {
    const controller = this.get('controller');
    const gain = this.get('gain');
    controller.gain = gain;
  }),
});
