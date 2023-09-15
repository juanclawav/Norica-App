import { GoogleAuthProvider, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./firebase";

/**
 * Aquí se establecen los provedores de los servicios de firebase, para que puedan
 * ser utilizados dentro del desarrollo de la app. Estos servicios son:
 * - proveer una forma de ingresar a la app por medio de un email y una contraseña
 * - proveer una forma de ingresar a la app por medio de una cuenta de google
 * - proveer una forma de registrar que usuario accedió a la aplicación
 */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const passwordReset = async (email:string) => {
  await sendPasswordResetEmail(auth,email);
};