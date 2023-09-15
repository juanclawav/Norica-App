import { Product } from "../../models/productModel";
import { useDispatch } from "../../store/StoreProvider";
import { CustomButton } from "./CustomButton";
import { types } from "../../store/storeReducer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { memo, useEffect, useState } from "react";
import { AmountButton } from "./AmountButton";

interface Props {
  product: Product;
  indexAddedProduct: number;
  quantityRequired: number;
  cartProducts: Product[];
  setCartProducts: (param: Product[]) => void;
}

export const AddedProduct = memo(
  ({
    product,
    indexAddedProduct,
    quantityRequired,
    cartProducts,
    setCartProducts,
  }: Props) => {
    const dispatch = useDispatch();
    const { name, price, quantity, imageUrl } = product;
    const { saveDataLS } = useLocalStorage();

    const [quantityToBuy, setQuantityToBuy] = useState<number>(0);

    useEffect(() => {
      setQuantityToBuy(quantityRequired);
    }, []);

    useEffect(() => {
      updateAddedProducts();
    }, [quantityToBuy]);

    const updateAddedProducts = () => {
      let auxAddedProductsList: Product[] = [...cartProducts];
      auxAddedProductsList[indexAddedProduct].quantityToBeBuyed = quantityToBuy;
      setCartProducts(auxAddedProductsList);
      dispatch({ type: types.setAddedProducts, value: auxAddedProductsList });
      saveDataLS("addedProducts", { addedProducts: auxAddedProductsList });
    };

    const deleteProduct = () => {
      const auxAddedProductsList: Product[] = [...cartProducts];
      auxAddedProductsList.splice(indexAddedProduct, 1);
      setCartProducts(auxAddedProductsList);
      dispatch({ type: types.setAddedProducts, value: auxAddedProductsList });
      saveDataLS("addedProducts", { addedProducts: auxAddedProductsList });
    };

    return (
      <section
        className="flex flex-col rounded-[40px] m-3 w-[50%] h-max items-center
        bg-white p-2"
      >
        <img src={imageUrl} className="w-[220px] h-[150px] rounded-[40px]" />
        <h1 className="text-2xl font-extrabold -mt-11 bg-white p-1 text-red-700 rounded-full">
          X{quantityToBuy}
        </h1>
        <div className="flex justify-between mt-4">
          <h1 className="text-lg font-medium">{name}</h1>
          <h2 className="text-xl font-semibold ml-5">{price} Bs.</h2>
        </div>
        <div className="flex flex-row justify-around flex-wrap m-1">
          <CustomButton
            textButton={"borrar"}
            normalBg={"bg-red-500"}
            hoverBg={"hover:bg-red-400"}
            activeBg={"active:bg-red-600"}
            textColor={"text-white"}
            typeButton={"button"}
            width={"48px"}
            height={"30px"}
            action={deleteProduct}
          />
          <AmountButton
            setAmount={setQuantityToBuy}
            amount={quantityToBuy}
            amountAvailable={quantity}
            type={"-"}
          />
          <AmountButton
            setAmount={setQuantityToBuy}
            amount={quantityToBuy}
            amountAvailable={quantity}
            type={"+"}
          />
        </div>
      </section>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.indexAddedProduct === nextProps.indexAddedProduct &&
      prevProps.cartProducts === nextProps.cartProducts
    );
  }
);
