import { memo } from "react";
import { Product } from "../../models/productModel";
import { AddedProduct } from "./AddedProduct";

interface Props {
  cartProducts: Product[];
  setCartProducts: (param: Product[]) => void;
}

export const ListAddedProducts = memo(
  ({ cartProducts, setCartProducts }: Props) => {
    return (
      <>
        {cartProducts.map((item, index) => (
          <AddedProduct
            key={item.name + Math.round(Math.random() * 1000000)}
            product={item}
            indexAddedProduct={index}
            quantityRequired={item.quantityToBeBuyed || 1}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        ))}
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.cartProducts.length === nextProps.cartProducts.length;
  }
);
