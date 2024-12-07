function permutate(numbers: Array<number>): Array<Array<number>> {
  if (numbers.length == 1) return [numbers];
  if (numbers.length == 2) {
    return [[numbers[0], numbers[1]], [numbers[1], numbers[0]]];
  }
  const res = [];
  for (let i = 0; i < numbers.length; i++) {
    res.push(
      permutate(numbers.toSpliced(i, 1))
        .map((p) => [numbers[i], p.concat()].flat()),
    );
  }

  return res.flat();
}

console.log(permutate([1, 2, 3, 4, 5]));
