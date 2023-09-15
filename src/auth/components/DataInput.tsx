interface Props {
  order: string;
  typeInput: string;
}

export const DataInput = ({ order, typeInput }: Props) => {
  return (
    <>
      <label
        htmlFor={typeInput}
        className="block mb-2 text-sm font-medium text-gray-900
      dark:text-white w-full"
      >
        {order}
      </label>
    </>
  );
};
