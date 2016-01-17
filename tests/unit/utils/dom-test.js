import dom from '../../../utils/dom';
import { module, test } from 'qunit';

module('Unit | Utility | dom');

if (!/PhantomJS/.test(window.navigator.userAgent)) {
  // Replace this with your real tests.
  test('pipe `mousedown` event', function(assert) {
    let src  = document.createElement('div');
    let dest = document.createElement('div');
    let wasClicked = false;

    dom.pipeMouseEvent({ source: src, destination: dest });

    dest.addEventListener('mousedown', function () {
      wasClicked = true;
    });

    src.dispatchEvent(new window.Event('mousedown'));

    assert.ok(wasClicked);
  });

  // Replace this with your real tests.
  test('pipe `click` event', function(assert) {
    let src  = document.createElement('div');
    let dest = document.createElement('div');
    let wasClicked = false;

    dom.pipeMouseEvent({ source: src, destination: dest });

    dest.addEventListener('click', function () {
      wasClicked = true;
    });

    src.dispatchEvent(new window.Event('click'));

    assert.ok(wasClicked);
  });
}
