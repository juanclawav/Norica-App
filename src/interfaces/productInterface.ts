import { Product } from "../models/productModel";

export const productInterfaceMaker = (product:any) => {
  const newProduct:Product = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    description: product.description,
    imageUrl: product.image_url
  };
  return newProduct;
};

export const productDBInterfaceMaker = (product:Product) => {
  const updatedProduct = {
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    description: product.description,
    image_url: product.imageUrl
  };
  return updatedProduct;
}