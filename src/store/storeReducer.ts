import { Action } from "../models/dataReducer";
import { hireFormTypes, hireFormInitialValues, hireFormReducer } from "./hireFormReducer";
import { loginInitialValues, loginReducer, loginTypes } from "./loginReducer";
import { trabajosInitialValues, trabajosTypes, trabajosReducer } from "./trabajosReducer";
import { cartTypes, cartInitialValues, cartReducer } from "./cartReducer";
import { productsTypes, productsInitialValues, productsReducer } from "./productsReducer";

export const types = {
  ...loginTypes,
  ...hireFormTypes,
  ...trabajosTypes,
  ...cartTypes,
  ...productsTypes,
};

export const initialValues = {
  ...loginInitialValues,
  ...hireFormInitialValues,
  ...trabajosInitialValues,
  ...cartInitialValues,
  ...productsInitialValues,
}

export const storeReducer = (state:any, action:Action) => {
  const type:string = action.type;
  if(type === types.login || type === types.logout){
    return loginReducer(state,action);
  }else if(type === types.getUserEmail || type === types.eraseUserEmail){
    return hireFormReducer(state,action);
  }else if(type === types.clearWorkList || type === types.setWorkList){
    return trabajosReducer(state,action);
  }else if(type === types.setAddedProducts || type === types.eraseAddedProducts){
    return cartReducer(state,action);
  }else if(type === types.setProductsList || type === types.clearProductsList){
    return productsReducer(state,action);
  }else{
    return state;
  }
};
