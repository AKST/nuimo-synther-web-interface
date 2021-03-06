

const notes = [
  'A', 'A#', 'B', 'C', 'C#', 'D',
  'D#', 'E', 'F', 'F#', 'G', 'G#'
];


export function noteIndex(index) {
  return notes[index < 0 ? 12 - (12 - ((index * -1) % 12)) : index % 12];
}

export function frequency (n) {
  const twenthRootOfTwo = Math.pow(2, 1 / 12);
  const A4Pos = 49;
  const A4hz = 440;
  return Math.pow(twenthRootOfTwo, n - A4Pos) * A4hz;
}

export function noteRepr (n) {
  var octave = Math.floor(n / 12);
  var tone = Math.floor((n < 0 ? 12 : 0) + (n % 12));
  var offset = n % 1;
  return { octave, tone, offset };
}

export default { noteRepr, frequency, noteIndex };
