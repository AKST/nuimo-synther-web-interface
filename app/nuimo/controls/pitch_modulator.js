import util from 'frontend/audio/util';


export class PitchModulator {
  constructor (monotron) {
    this.__monotron = monotron;
    this.__note = 49;
    this.__playing = false;
    this.cap = 1000;
    this.sensitivity = 0.01;

    this.__lfoRate = 0;
    this.__lfoAmp = 0;
    this.__gain = 1;
    this.__cutoffFreq = 500;
    this.__cutoffQ = 0;
  }

  //
  // ACCESSORS
  //

  get gain () {
    return this.__gain;
  }
  set gain (level) {
    this.__gain = level;
    if (this.__playing) {
      this.__monotron.setGain(level);
    }
  }

  get lfoAmp () {
    return this.__lfoAmp;
  }
  set lfoAmp (amplitude) {
    this.__lfoAmp = amplitude;
    this.__monotron.setLFOAmp(amplitude);
  }

  get lfoRate () {
    return this.__lfoRate;
  }
  set lfoRate (rate) {
    this.__lfoRate = rate;
    this.__monotron.setLFORate(rate);
  }

  get cutoffFreq () {
    return this.__cutoffFreq;
  }
  set cutoffFreq (frequency) {
    this.__cutoffFreq = frequency;
    this.__monotron.setCutoffFreq(frequency);
  }

  get cutoffQ () {
    return this.__cutoffQ;
  }
  set cutoffQ (q) {
    this.__cutoffQ = q;
    this.__monotron.setCutoffQ(q);
  }

  set lfoTarget (value) {
    switch (value) {
      case PitchModulator.LFO_TARGET.NONE:
        this.__monotron.setLFOTarget('none');
        break;
      case PitchModulator.LFO_TARGET.CUTOFF_F:
        this.__monotron.setLFOTarget('cutoff');
        break;
      case PitchModulator.LFO_TARGET.CUTOFF_Q:
        this.__monotron.setLFOTarget('q');
        break;
      case PitchModulator.LFO_TARGET.FREQUENCY:
        this.__monotron.setLFOTarget('pitch');
        break;
      default:
        throw new Error('unknown lfo target');
    }
  }

  //
  // VISITOR API
  //

  withUpdate (update) {
    this[update.type](update.repr);
  }

  turn (update) {
    this.__updateNote(update.offset);
    if (this.__playing) {
      this.__play(this.__note);
    }
  }

  click (update) {
    if (this.__playing = update.down) {
      this.__play(this.__note);
    }
    else {
      this.__monotron.mute();
    }
  }

  swipe (/*update*/) {
    console.warn('swipe not implemented');
  }

  //
  // internal API
  //

  __updateNote (offset) {
    this.__note =
      Math.min(128,
      Math.max(-24, this.__note + (offset * this.sensitivity)));
  }

  __play(note) {
    const pitch = util.frequency(note);
    this.__monotron.play({ pitch, level: this.gain });
  }

  repr () {
    return {
      playing: this.__playing,
      note: {
        position: util.noteRepr(this.__note),
        pitch: util.frequency(this.__note),
      },
      preset: {
        gain: this.__gain,
        lfoAmp: this.__lfoAmp,
        lfoRate: this.__lfoRate,
      }
    };
  }
}


PitchModulator.LFO_TARGET = {
  NONE: Symbol(),
  CUTOFF_F: Symbol(),
  CUTOFF_Q: Symbol(),
  FREQUENCY: Symbol(),
};


export default PitchModulator;
