type TestCase = {
  input: number;
  expected: number;
};

export const testCases: TestCase[] = [
  { input: 1, expected: 1 },
  { input: 10, expected: 55 },
  { input: 100, expected: 5050 },
  { input: 999, expected: 499500 },
  { input: 0, expected: 0 },
  { input: 2, expected: 3 },
  { input: -1, expected: 0 },
  { input: 999.5, expected: 0 },
  { input: NaN, expected: 0 },
  { input: Infinity, expected: 0 },
  { input: -Infinity, expected: 0 },
];
