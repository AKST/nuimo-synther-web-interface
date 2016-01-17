export default class Monotron {
  constructor ({ context, nodes: { osc, filter, lfo, lfoGain, output } }) {
    this.context = context;

    this.osc = osc;
    this.lfo = lfo;
    this.output = output;
    this.filter = filter;
    this.lfoGain = lfoGain;
  }

  setGain (level, time = this.context.currentTime) {
    this.output.gain.linearRampToValueAtTime(level, time + 0.1);
  }

  play ({ pitch, level, time = this.context.currentTime }) {
    this.osc.frequency.setValueAtTime(pitch, time);
    this.setGain(level, time);
  }

  mute (time = this.context.currentTime) {
    this.setGain(0.0, time);
  }

  connect (target) {
    this.output.connect(target);
  }

  static makeNodes (context) {
    const osc = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    const output = context.createGain();
    const filter = context.createBiquadFilter();

    osc.connect(filter);
    filter.connect(output);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    output.gain.value = 0;
    osc.type = 'sawtooth';
    lfo.type = 'sawtooth';
    osc.start(context.currentTime);
    lfo.start(context.currentTime);

    return { osc, lfo, filter, output, lfoGain };
  }

  static makeSynth (context) {
    const nodes = Monotron.makeNodes(context);
    return new Monotron({ context, nodes });
  }
}
