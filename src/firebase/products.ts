import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { productInterfaceMaker } from "../interfaces/productInterface";

const products = collection(db,"products");

/**
 * Estos metodos ayudan a traer los datos de los productos que provee la empresa, para
 * luego ser puestos en la pantalla "productos". Al igual que con el método
 * "getPreviusWorks", se obtienen estos productos por medio de funciones que provee
 * firebase para manipular la firestore, como lo es el método getDocs. Al obtener los
 * productos, se los guarda en un arreglo, siendo antes convertidos a objetos que
 * tienen los mismos valores de los atributos de los productos obtenidos, solo que
 * el nombre de estos atributos se los cambian (implementación de una versión
 * simplificada de un Adapter). Finalmente este arreglo es retornado. 
 */

export const getProducts = async () => {
  try{
    const data = await getDocs(products);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    const productsGotten:any = [];
    if(filterData){
      filterData.map(item => productsGotten.push(productInterfaceMaker(item)));
      return productsGotten;
    }else{
      return null;
    }
  }catch(err){
    console.error(err);
    return null;
  }
};

/**
 * 
 * Aqui se actualiza un producto de la tienda, utilizando el método "updateDoc"
 * concretamente actualiza la cantidad de unidades que le restan a un producto
 */

export const setProducts = async (productId:string,quantity:number, buyedQuantity:number) => {
  try{
    const newProductQuantity:number = quantity - buyedQuantity;
    const productDoc = doc(db, "products", productId);
    await updateDoc(productDoc, { quantity:newProductQuantity });
  }catch(err){
    console.error(err);
  }
}