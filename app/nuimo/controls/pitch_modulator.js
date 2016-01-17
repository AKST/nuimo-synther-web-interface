import util from 'frontend/audio/util';


export default class {
  constructor (monotron) {
    this.__monotron = monotron;
    this.__note = 49;
    this.__playing = false;
    this.cap = 1000;
    this.sensitivity = 0.01;
    this.__gain = 1;
  }

  get gain () {
    return this.__gain;
  }
  set gain (level) {
    this.__gain = level;
    if (this.__playing) {
      this.__monotron.setGain(level);
    }
  }

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

  swipe (update) {

  }

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
      }
    };
  }
}
