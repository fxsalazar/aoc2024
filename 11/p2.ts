const line: Array<[number, number]> = Deno.readTextFileSync(
  new URL("./input", import.meta.url),
)
  .split(" ").map(Number).map((l) => [l, 75]);
console.log("🚀 ~ line:", line);

const cache = new Map<string, number>();
const t = line.map((l) => blink(l)).reduce((acc, v) => acc += v, 0);
console.log("🚀 ~ t ~ t:", t);

function blink([l, n]: [number, number]): number {
  if (n == 0) return 1;
  const cacheKey = `${l}-${n}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  const newStones = blinkForStone(l);
  const res = newStones.map((ns) => blink([ns, n - 1]))
    .reduce((acc, v) => acc += v, 0);
  cache.set(cacheKey, res);
  return res;
}

function blinkForStone(l: number): Array<number> {
  if (l == 0) return [1];
  const digits = getDigits(l);
  if (digits % 2 == 0) return handleEvenDigits(l, digits);
  return [l * 2024];
}

function handleEvenDigits(n: number, d: number): Array<number> {
  const divider = Math.pow(10, d / 2);
  return [Math.trunc(n / divider), n % divider];
}

function getDigits(n: number): number {
  return Math.floor(Math.log10(n)) + 1;
}
