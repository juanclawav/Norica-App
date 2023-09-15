interface Props {
  message: string;
}

export const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="p-2 rounded-xl text-red-500 font-medium text-sm">{message}</p>
  );
};
