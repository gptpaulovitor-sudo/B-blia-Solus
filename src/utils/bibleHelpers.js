/**
 * Formata um conjunto de números de versículos em intervalos elegantes (ex: "1-4" ou "1-2, 5")
 */
export function formatarIntervalosVersiculos(numeros = []) {
  if (!numeros || numeros.length === 0) return '';
  const sorted = [...new Set(numeros.map(Number))].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === prev + 1) {
      prev = sorted[i];
    } else {
      ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
      start = sorted[i];
      prev = sorted[i];
    }
  }
  ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
  return ranges.join(', ');
}
