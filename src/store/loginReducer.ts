import { Action } from "../models/dataReducer";

export const loginTypes = {
  login: "login user",
  logout: "logout user"
};

// global varaibles, 
export const loginInitialValues = {
  // asignando el valor inicial de las variables globales
  // cuando se incia la aplicacion
  auth: localStorage.getItem("userLogIn")!==null ? JSON.parse(localStorage.getItem("userLogIn") || "{}").auth : false
};

export const loginReducer = (state:any, action:Action) => {
  const type:string = action.type;
  if(type === loginTypes.login){
    return {
      ...state,
      auth: true
    };
  } else if(type === loginTypes.logout){
    return {
      ...state,
      auth: false
    };
  } else{
    return state;
  }
};
