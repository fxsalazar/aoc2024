const line = Deno.readTextFileSync(new URL("./input-t", import.meta.url))
  .split(" ").map(Number);

let res = line;
for (let i = 0; i < 6; i++) {
  console.log("🚀 ~ i:", i);
  res = blink(res);
}
console.log("🚀 ~ res ~ res:", res.length);

function blink(line: Array<number>) {
  const res = line.map((l) => {
    if (l == 0) return [1];
    const digits = getDigits(l);
    if (digits % 2 == 0) {
      return handleEvenDigits(l, digits);
    }
    return [l * 2024];
  }).flat();

  return res;
}

function handleEvenDigits(n: number, d: number): Array<number> {
  const divider = Math.pow(10, d / 2);
  return [Math.trunc(n / divider), n % divider];
}

function getDigits(n: number): number {
  return Math.floor(Math.log10(n)) + 1;
}
