function isValidNumber(n: number): boolean {
  if (Number.isNaN(n) || !Number.isSafeInteger(n) || n < 0) {
    return false;
  }
  return true;
}

// time complexity: O(n), space complexity: O(1)
export function sum_to_n_a(n: number): number {
  if (!isValidNumber(n)) {
    return 0;
  }
  let s = 0;
  for (let i = 1; i <= n; i++) {
    s += i;
  }
  return s;
}

// time complexity: O(1), space complexity: O(1)
export function sum_to_n_b(n: number): number {
  if (!isValidNumber(n)) {
    return 0;
  }
  return (n * (n + 1)) / 2;
}

// time complexity: O(n), space complexity: O(n)
export function sum_to_n_c(n: number): number {
  if (!isValidNumber(n)) {
    return 0;
  }
  if (n == 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
}
