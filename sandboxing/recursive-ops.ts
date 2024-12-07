const r = 7290;
const a = [6, 8, 6, 15];

function go(v: number, partial: number): boolean {
  console.log("🚀 ~ go ~ partial:", partial);
  if (partial == r) return true;
  if (partial > r || v == a.length) return false;

  return go(v + 1, a[v] + partial) || go(v + 1, a[v] * partial) ||
    go(v + 1, Number(`${partial}${a[v]}`));
}

console.log(go(0, 0));
