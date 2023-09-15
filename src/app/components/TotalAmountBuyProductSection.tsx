interface Props {
  amount: number;
}

export const TotalAmountBuyProductSection = ({ amount }: Props) => {
  return (
    <section className="e">
      <span className="text-2xl font-semibold">Total: {amount} Bs.</span>
    </section>
  );
};
