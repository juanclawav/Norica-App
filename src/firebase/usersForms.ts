import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { setDateToString } from "../helpers/dateHireForm";
import { FieldValues } from "react-hook-form";

const usersFormsDate = collection(db,"users-emails-date");

/**
 * 
 * Este método ayuda a obtener el registro de los usuarios que hayan enviado un formulario
 * para contratar a la empresa. Y la forma en que se logra este cometido es de igual manera
 * con el método "getDocs" de firebase.
 */
export const getUserFormDate = async (userEmail:string) => {
  let data;
  try{
    data = await getDocs(usersFormsDate);
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
 * Este método ayuda a publicar un nuevo registro de un usario que envía por primera ver
 * un formulario para lograr contratar a la empresa. En este caso, se utiliza el método
 * "addDocs" de firebase para lograr este cometido
 */
export const postUserFormDate = async (authEmail:string, dateSubmit:string, data:FieldValues) => {
  const newObject:any = {...data, dateSubmit};
  newObject.date = setDateToString(data.date);
  await addDoc(usersFormsDate,{
    userForms: [newObject],
    userEmail: authEmail,
    userId: auth?.currentUser?.uid,
  });
};

/**
 * 
 * Este método ayuda a actualizar el registro de un usuario que ya haya enviado un
 * formulario con anterioridad, utilizando los métodos "doc" y "updateDoc" de firebase
 */
export const updateUserFormDate = async (id:string, authEmail:string, dateSubmit:string, data:FieldValues) => {
  const user:any = await getUserFormDate(authEmail);
  if(user!==null){
    const newObject:any = {...data,dateSubmit};
    newObject.date = setDateToString(data.date);
    const userForm:any = doc(db,"users-emails-date",id);
    await updateDoc(userForm, { userForms:[...user.userForms,newObject] });
  }
};
