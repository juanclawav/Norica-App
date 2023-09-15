interface Props {
  errorText: string;
}

export const ErrorPage = ({ errorText }: Props) => {
  return (
    <section className="w-full h-[800px] flex justify-center items-center">
      <p className=" text-4xl text-white font-semibold text-center">
        {errorText}
      </p>
    </section>
  );
};
