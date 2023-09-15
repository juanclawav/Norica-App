import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const previusWorks = collection(db,"previus-works");

/**
 * El método que se encuentra en la parte inferior, ayuda a traer los trabajos en los
 * que la empresa trabajó en el pasado de la BD. La forma en que lo hace es extrayendo la
 * collection "previus-works" de la firestore, para luego establecer estos datos dentro
 * de un arreglo, para luego ser retornado.
 */

export const getPreviusWorks = async () => {
  let data;
  try{
    data = await getDocs(previusWorks);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    if(filterData){
      return filterData;
    }else{
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};