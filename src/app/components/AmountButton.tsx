import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  setAmount: (param: number) => void;
  amount: number;
  amountAvailable: number;
  type: string;
}

export const AmountButton = ({
  setAmount,
  amount,
  type,
  amountAvailable,
}: Props) => {
  const changeAmount = () => {
    if (type === "+") {
      if (amount < amountAvailable) setAmount(amount + 1);
    } else {
      if (amount > 1) setAmount(amount - 1);
    }
  };

  const STYLES =
    type !== "+"
      ? `text-gray-900 hover:text-white border border-gray-800
  hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium
  rounded-lg text-sm px-2.5 w- py-1 text-center m-2 mb-2 dark:border-gray-600
  dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800`
      : `text-red-700 hover:text-white border border-red-700 hover:bg-red-800
    focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg
    text-sm px-2.5 py-1 text-center m-2 mb-2 dark:border-red-500 dark:text-red-500
    dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`;

  return (
    <button className={STYLES} onClick={changeAmount}>
      <FontAwesomeIcon icon={type === "+" ? faPlus : faMinus} />
    </button>
  );
};
