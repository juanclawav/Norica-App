import { Action } from "../models/dataReducer";

export const cartTypes = {
  setAddedProducts: "set added products",
  eraseAddedProducts: "erase added products"
};

export const cartInitialValues = {
  addedProducts: localStorage.getItem("addedProducts")!==null ? (JSON.parse(localStorage.getItem("addedProducts") || "{}")).addedProducts : []
};

export const cartReducer = (state:any, action:Action) => {
  const {type,value} = action;
  if(type === cartTypes.setAddedProducts){
    return {
      ...state,
      addedProducts: [...value]
    };
  } else if(type === cartTypes.eraseAddedProducts){
    return {
      ...state,
      addedProducts: []
    };
  } else{
    return state;
  }
};
