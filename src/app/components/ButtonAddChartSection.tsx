import { AmountButton } from "./AmountButton";

interface Props {
  setAmount: (param: number) => void;
  amount: number;
  quantity: number;
}

export const ButtonAddChartSection = ({
  setAmount,
  amount,
  quantity,
}: Props) => {
  return (
    <section className="flex flex-col justify-center">
      <span className="text-base font-medium">
        Cantidad disponible: {quantity}
      </span>
      <div className="flex flex-row w-[200px] justify-around h-max items-center">
        <AmountButton
          setAmount={setAmount}
          amount={amount}
          type={"-"}
          amountAvailable={quantity}
        />
        <span className="m-2 font-medium text-lg">{amount}</span>
        <AmountButton
          setAmount={setAmount}
          amount={amount}
          type={"+"}
          amountAvailable={quantity}
        />
      </div>
    </section>
  );
};
