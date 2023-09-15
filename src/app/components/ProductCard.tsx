import { Card } from "flowbite-react";
import { Product } from "../../models/productModel";
import { ImageProduct } from "./ImageProduct";

interface Props {
  product: Product;
  setProductToBuy: (param: Product) => void;
  setOpenModal: (param: boolean) => void;
}

export const ProductCard = ({
  product,
  setProductToBuy,
  setOpenModal,
}: Props) => {
  const { name, price, imageUrl } = product;

  return (
    <Card
      className="bg-black bg-opacity-90 hover:bg-opacity-60 rounded-[40px] m-2 mb-3
      flex flex-col items-center"
      onClick={() => {
        setProductToBuy(product);
        setOpenModal(true);
      }}
    >
      <ImageProduct
        styles={"w-[200px] h-[200px] rounded-[40px]"}
        imageUrl={imageUrl || ""}
        name={name}
      />
      <span className="text-xl text-white -mt-10 dark:text-white font-medium">
        {price} Bs.
      </span>
    </Card>
  );
};
