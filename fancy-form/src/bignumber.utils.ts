import BigNumber from "bignumber.js";
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP });

export const divide = (...args: string[]): string => {
  if (args.length === 0) {
    return "0";
  }

  return args
    .reduce((accumulator: BigNumber, arg: string, currentIndex: number) => {
      if (currentIndex === 0) {
        return accumulator.plus(arg);
      }

      return accumulator.dividedBy(arg);
    }, new BigNumber("0"))
    .toFixed();
};

export const multiply = (...args: string[]): string => {
  if (args.length === 0) {
    return "0";
  }

  return args
    .reduce((accumulator: BigNumber, arg: string) => {
      return accumulator.multipliedBy(arg);
    }, new BigNumber("1"))
    .toFixed();
};

export const roundHalfEven = (x: string, decimalPlaces = 3): string => {
  if (decimalPlaces >= 0) {
    return new BigNumber(x)
      .dp(decimalPlaces, BigNumber.ROUND_HALF_EVEN)
      .toFixed();
  }
  const n = new BigNumber(decimalPlaces).negated().toFixed();
  const nPow = Math.pow(10, Number(n))?.toString();
  const y = divide(x, nPow);
  const yRounded = new BigNumber(y).dp(0, BigNumber.ROUND_HALF_EVEN).toFixed();
  return multiply(yRounded, nPow);
};
