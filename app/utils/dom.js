
export function pipeMouseEvent({ source, destination, context }) {
  function transferEvent (event) {
    const clone = new window.MouseEvent(event.type, event);
    event.preventDefault();
    destination.dispatchEvent(clone);
  }

  source.addEventListener('click', transferEvent);
  source.addEventListener('mousedown', transferEvent);

  context.on('willRemoveElement', function () {
    source.removeEventListener('click', transferEvent);
    source.removeEventListener('mousedown', transferEvent);
  });
}


export default { pipeMouseEvent };
