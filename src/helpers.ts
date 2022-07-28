export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffle<T>(a: Array<T>) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * An infinitley repeating Van der Corput sequence
 * @param base
 * @param length
 */
export function* vdc(
  base = 2,
  length = 4294967296
): Generator<number, number, number> {
  let i = 0;
  while (true) {
    let q = 0;
    let denominator = base;
    let n = i;

    while (n > 0) {
      q += Math.floor(n % base) / denominator;
      n = Math.floor(n / base);
      denominator *= base;
    }

    yield q;
    i = (i + 1) % length;
  }
}
