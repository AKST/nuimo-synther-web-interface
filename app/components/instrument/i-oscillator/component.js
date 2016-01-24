import Ember from 'ember';
import utils from 'frontend/audio/util';
import Dialer from 'frontend/nuimo/controls/pitch_modulator';
import Monotron from 'frontend/audio/synth/monotron';


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
  lfoAmp: 0,
  lfoRate: 54,
  cutoffFreq: 500,
  cutoffQ: 0,

  optionsLFO: null,

  initOptionsLFO: Ember.on('init', function () {
    this.set('optionsLFO', [
      { label: 'none',        value: Dialer.LFO_TARGET.NONE },
      { label: 'cutoff freq', value: Dialer.LFO_TARGET.CUTOFF_F },
      { label: 'cutoff q',    value: Dialer.LFO_TARGET.CUTOFF_Q },
      { label: 'frequency',   value: Dialer.LFO_TARGET.FREQUENCY },
    ]);
  }),

  _listenForUpdates: Ember.on('willInsertElement', function () {
    const nuimo = this.get('nuimo');
    const context = this.get('audio').getContext();
    const monotron = Monotron.makeSynth(context);
    const controller = new Dialer(monotron);

    monotron.setLFOTarget('cutoff');
    monotron.connect(context.destination);

    controller.gain = this.get('gain');
    controller.lfoAmp = this.get('lfoAmp');
    controller.lfoRate = this.get('lfoRate');
    controller.cutoffQ = this.get('cutoffQ');
    controller.cutoffFreq = this.get('cutoffFreq');

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
      note: utils.noteIndex(repr.note.position.tone),
    });
  },

  //
  // ACTIONS
  //

  actions: {
    update (metric, amount) {
      this.set(metric, amount);
    },

    updateLFO (target) {
      const controller = this.get('controller');
      controller.lfoTarget = target;
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

  trackLFORate: Ember.observer('lfoRate', function () {
    const controller = this.get('controller');
    const lfoRate = this.get('lfoRate');
    controller.lfoRate = lfoRate;
  }),

  trackLFOAmp: Ember.observer('lfoAmp', function () {
    const controller = this.get('controller');
    const lfoAmp = this.get('lfoAmp');
    controller.lfoAmp = lfoAmp;
  }),

  trackCutoffFreq: Ember.observer('cutoffFreq', function () {
    const controller = this.get('controller');
    const cutoffFreq = this.get('cutoffFreq');
    controller.cutoffFreq = cutoffFreq;
  }),

  trackCutoffQ: Ember.observer('cutoffQ', function () {
    const controller = this.get('controller');
    const cutoffQ = this.get('cutoffQ');
    controller.cutoffQ = cutoffQ;
  }),
});
