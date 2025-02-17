import {
  Button,
  Col,
  Form,
  FormProps,
  InputNumber,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { fetchExchange } from "./apis";
import { divide } from "./bignumber.utils";
import {
  iconMapper,
  priceMapper,
  prices,
  updatedTimeMapper,
} from "./constants";

type FieldType = {
  amount: number;
  from: string;
  to: string;
};

function App() {
  const [form] = Form.useForm();
  const [result, setResult] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const options = prices.map(({ currency, icon }) => {
    return {
      label: (
        <Space>
          <SVG src={icon} width={20} height={20} title={currency} />
          <span>{currency}</span>
        </Space>
      ),
      value: currency,
    };
  });

  const watchFromCurrency = Form.useWatch("from", form);
  const watchAmount = Form.useWatch("amount", form) || 0;
  const watchToCurrency = Form.useWatch("to", form);

  const onFinish: FormProps<FieldType>["onFinish"] = (formData) => {
    setIsSubmitting(true);
    fetchExchange(formData)
      .then((response) => {
        if (response) {
          setResult(
            (response as unknown as { data: { exchangedAmount: string } })?.data
              ?.exchangedAmount
          );
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description:
            error.message || "Somethings went wrong, please try again!",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (result) {
      onFinish({
        amount: watchAmount,
        from: watchFromCurrency,
        to: watchToCurrency,
      });
    }
  }, [result, watchFromCurrency, watchAmount, watchToCurrency]);

  return (
    <div className="w-[100vw] h-[100vh] relative overflow-hidden flex flex-col justify-center items-center bg-[#0e2d59]">
      <header className="text-center mb-5">
        <h1 className="text-3xl md:text-5xl mb-3 font-medium text-white">
          Token Converter
        </h1>
        <h2 className="text-white text-xl font-light">
          Check tokens exchange rates
        </h2>
      </header>
      <div className="rounded-xl md:rounded-4xl w-[90%] md:w-[80%] bg-red shadow-2xl z-10 relative bg-white p-6 md:p-10">
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[8, 0]}>
            <Col xs={24} md={8}>
              <Form.Item
                initialValue={1}
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: "Please enter a valid amount" },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  style={{ width: "100%" }}
                  prefix={
                    <span className="pr-2">
                      <SVG
                        width={20}
                        height={20}
                        src={iconMapper[watchFromCurrency]}
                      />
                    </span>
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="From"
                name="from"
                rules={[{ required: true, message: "Please select token" }]}
                initialValue={"BLUR"}
              >
                <Select
                  showSearch
                  options={options}
                  filterOption={(input, option) =>
                    (option?.value ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                initialValue={"BUSD"}
                label="To"
                name="to"
                rules={[{ required: true, message: "Please select token" }]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.value ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={options}
                />
              </Form.Item>
            </Col>
            {!result && (
              <Form.Item
                className="!mb-0 !flex !justify-end !w-full"
                label={null}
              >
                <Button
                  loading={isSubmitting}
                  className="!px-24 !h-[53px]"
                  type="primary"
                  htmlType="submit"
                >
                  Convert
                </Button>
              </Form.Item>
            )}
          </Row>
        </Form>

        {result && (
          <>
            <div className="text-xs text-gray-500">{`*Last updated ${new Date(
              updatedTimeMapper[watchFromCurrency]
            )}`}</div>
            <div className="space-x-2 mb-2">
              <span className="text-gray-500 text-xl">{`${parseFloat(
                watchAmount
              ).toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })} ${watchFromCurrency} =`}</span>
              <span className="text-gray-700 text-2xl font-medium">
                {parseFloat(result).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}
              </span>
              <span className="text-gray-500 text-xl">{watchToCurrency}</span>
            </div>
            <div className="text-gray-500 text-sm">
              <div>
                <span>{`1 ${watchFromCurrency} = `}</span>
                <span>{`${parseFloat(
                  divide(
                    priceMapper[watchFromCurrency].toString(),
                    priceMapper[watchToCurrency].toString()
                  )
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })} ${watchToCurrency}`}</span>
              </div>
              <div>
                <span>{`1 ${watchToCurrency} = `}</span>
                <span>{`${parseFloat(
                  divide(
                    priceMapper[watchToCurrency].toString(),
                    priceMapper[watchFromCurrency].toString()
                  )
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })} ${watchFromCurrency}`}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="absolute -left-50 -right-50 -bottom-[calc(100%*1.5)] h-[calc(100%*2)] bg-white rounded-tl-[calc(30%)] rounded-tr-[calc(30%)]"></div>
    </div>
  );
}

export default App;
