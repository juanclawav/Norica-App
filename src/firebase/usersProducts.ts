import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const usersProducts = collection(db,"users-products");

/**
 * 
 * Este método ayuda a obtener el registro de los usuarios que hayan comprado uno de
 * los productos que ofrece la empresa. Y la forma en que se logra este cometido es de
 * igual manera con el método "getDocs" de firebase.
 */
export const getUserProductList = async (userEmail:string) => {
  let data;
  try{
    data = await getDocs(usersProducts);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    const userGotten = filterData.find((item:any) => item.userEmail === userEmail);
    if(userGotten){
      return userGotten;
    }else{
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * 
 * Este método ayuda a publicar un nuevo registro de un usario que compra por primera ver
 * uno o varios productos de la empresa. En este caso, se utiliza el método
 * "addDocs" de firebase para lograr este cometido
 */
export const postUserProductsList = async (authEmail:string, dateSubmit:string, data:any) => {
  const newObject = {...data, date: dateSubmit};
  await addDoc(usersProducts,{
    userBuyedProductsRegistration: [newObject],
    userEmail: authEmail,
    userId: auth?.currentUser?.uid,
  });
};

/**
 * 
 * Este método ayuda a actualizar el registro de un usuario que ya haya comprado uno
 * o varios productos con anterioridad, utilizando los métodos "doc" y "updateDoc"
 * de firebase
 */
export const updateUserProductsList = async (id:string, authEmail:string, dateSubmit:string, data:any) => {
  const user:any = await getUserProductList(authEmail);
  if(user!==null){
    const newObject = {...data, date: dateSubmit};
    const userProducts = doc(db,"users-products",id);
    await updateDoc(userProducts,
      { userBuyedProductsRegistration:[...user.userBuyedProductsRegistration,newObject] }
    );
  }
};
