import { multiply, divide } from "./bignumber.utils";
import { priceMapper, DELAY, updatedTimeMapper } from "./constants";

export const fetchExchange = ({
  amount,
  from,
  to,
}: {
  amount: number;
  from: string;
  to: string;
}) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const exchangedAmount = multiply(
          amount.toString(),
          divide(priceMapper[from].toString(), priceMapper[to].toString())
        );
        const fromPerTo = divide(
          priceMapper[from].toString(),
          priceMapper[to].toString()
        );
        const toPerFrom = divide(
          priceMapper[to].toString(),
          priceMapper[from].toString()
        );
        const updatedTime = updatedTimeMapper[from];
        resolve({
          status: 200,
          data: {
            exchangedAmount,
            fromPerTo,
            toPerFrom,
            updatedTime,
            from,
            to,
            amount,
          },
          message: "Success",
        });
      } catch (error) {
        console.error("Exchange token fail: ", error);
        reject({ status: 500, data: null, message: "Somethings went wrong" });
      }
    }, DELAY);
  });
