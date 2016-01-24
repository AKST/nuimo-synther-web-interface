import { pipeMouseEvent } from "frontend/utils/dom";
import Ember from 'ember';



export default Ember.Component.extend({
  classNames: ['n__c--i-knob'],
  classNameBindings: ['classNS'],
  classNS: '',

  label: '???',

  min: null,
  max: null,

  _minDeg: -135,
  _maxDeg: 135,

  value: 0,
  sensitivity: 1,

  makeLabelUnSelectable: Ember.on('willInsertElement', function () {
    const el = this.get('element');
    const dial = el.querySelector('.n__c--i-knob__wheel');
    const node = el.querySelector('.n__c--i-knob__value');
    const label = el.querySelector('.n__c--i-knob__label');
    pipeMouseEvent({ source: node, destination: dial, context: this });


    const handler = event => this.startTurning(event);
    const preventer = e => {
      e.preventDefault();
      return false;
    };

    dial.addEventListener('mousedown', handler, this);
    label.addEventListener('mousedown', preventer, this);
    this.on('willRemoveElement', () => {
      dial.removeEventListener('mousedown', handler);
      label.removeEventListener('mousedown', preventer);
    });

  }),

  _interpolate: Ember.computed('min', 'max', '_minDeg', '_maxDeg', function () {
    const xa = this.get('min');
    const ya = this.get('_minDeg');
    const xb = this.get('max');
    const yb = this.get('_maxDeg');
    const m = (yb - ya) / (xb - xa);
    return n => (m * (n - xa)) + ya;
  }),

  _rangeMapping: Ember.computed('min', 'max', '_minDeg', '_maxDeg', function () {
    let vRange = this.get('max') - this.get('min');
    if (vRange < 0) {
      vRange *= -1;
    }

    let dRange = this.get('_maxDeg') - this.get('_minDeg');
    if (dRange < 0) {
      dRange *= -1;
    }

    return vRange / dRange;
  }),

  /**
   * this is mostly done to handle the xxs warning of inline styles
   */
  wheelStyle: Ember.computed('value', '_interpolate', function () {
    const offset = this.get('value');
    const interpolation = this.get('_interpolate');
    return new Ember.Handlebars.SafeString(
      `transform: rotate(${interpolation(offset)}deg)`
    );
  }),

  startTurning (event) {
    const min = this.get('min');
    const max = this.get('max');
    const initialOffset = this.get('value');
    const rangeMapping = this.get('_rangeMapping');
    const sensitivity = this.get('sensitivity');
    const { screenX: x, screenY: y } = event;

    const release = () => {
      window.removeEventListener('mouseup', release);
      window.removeEventListener('mousemove', move);
    };

    const move = event => {
      const { screenX: xd, screenY: yd } = event;
      const a = x - xd;
      const b = y - yd;
      const c = Math.sqrt(a * a + b * b);
      let update = initialOffset + (c * Math.sign(xd - x) * sensitivity * rangeMapping);

      if (min != null) {
        update = Math.max(min, update);
      }
      if (max != null) {
        update = Math.min(max, update);
      }

      this.sendAction('onTurn', update);
    };

    window.addEventListener('mouseup', release);
    window.addEventListener('mousemove', move);
  },
});
