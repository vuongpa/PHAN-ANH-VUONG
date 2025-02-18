import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum";
import { testCases } from "./test-cases";

test("sum adds two numbers", () => {
  for (const testCase of testCases) {
    expect(sum_to_n_a(testCase.input)).toBe(testCase.expected);
    expect(sum_to_n_b(testCase.input)).toBe(testCase.expected);
    expect(sum_to_n_c(testCase.input)).toBe(testCase.expected);
  }
});
