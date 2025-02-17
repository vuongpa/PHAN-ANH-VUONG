import { multiply, divide } from "./bignumber.utils";
import { priceMapper, DELAY } from "./constants";

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
        resolve({
          status: 200,
          data: {
            exchangedAmount,
          },
          message: "Success",
        });
      } catch (error) {
        console.error("Exchange token fail: ", error);
        reject({ status: 500, data: null, message: "Somethings went wrong" });
      }
    }, DELAY);
  });
