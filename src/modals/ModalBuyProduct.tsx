import { Product } from "../models/productModel";
import { useEffect, useState } from "react";
import { ButtonAddChartSection } from "../app/components/ButtonAddChartSection";
import { useStore } from "../store/StoreProvider";

interface Props {
  product: Product;
  setOpenModal: (param: boolean) => void;
  addToChart: (product: Product, quantity: number) => void;
}

export const ModalBuyProduct = ({
  product,
  setOpenModal,
  addToChart,
}: Props) => {
  const { id, price, quantity, imageUrl, description, name } = product;

  const { addedProducts } = useStore();

  const verifyIfExists = () => {
    const findedAddedProduct: Product = addedProducts.find(
      (item: Product) => item.id === id
    );
    if (findedAddedProduct !== undefined) {
      setAmount(findedAddedProduct.quantityToBeBuyed || 1);
    }
  };

  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    verifyIfExists();
  }, []);

  return (
    <>
      <div className="w-[50%] bg-white rounded-[40px] shadow-lg p-3 flex flex-col h-max">
        <header className="text-base  m-3">COMPRAR PRODUCTO</header>
        <div className="flex flex-row m-3 items-center">
          <img
            className="w-[250px] h-[250px] rounded-3xl"
            src={imageUrl || ""}
          />
          <section className="ml-5 flex flex-col w-[60%]">
            <h2 className="font-bold text-3xl mb-3">{name}</h2>
            <h1 className="mb-2 h-24 w-full overflow-y-auto">
              {description} Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Pariatur amet itaque reprehenderit assumenda veritatis,
              blanditiis accusantium corrupti voluptatibus voluptas possimus
              magni non deleniti repudiandae quos excepturi, odit illo nulla
              quae?
            </h1>
            <ButtonAddChartSection
              setAmount={setAmount}
              amount={amount}
              quantity={quantity}
            />
            <h5 className="text-2xl font-semibold">
              Total: {amount * price} Bs.
            </h5>
          </section>
        </div>
        <footer className="flex flex-row justify-center m-2">
          <button
            className="w-[180px] h-[45px] text-white bg-red-600 hover:bg-black
active:bg-gray-700 text-base font-thin rounded-xl "
            onClick={() => addToChart(product, amount)}
          >
            Añadir a carrito
          </button>
          <button
            className="w-[180px] ml-8 h-[45px] text-white bg-gray-600 hover:bg-black
active:bg-gray-700 text-base font-thin rounded-xl "
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </button>
        </footer>
      </div>
    </>
  );
};
