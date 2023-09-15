import { Action } from "../models/dataReducer";

export const productsTypes = {
  setProductsList: "set products list",
  clearProductsList: "clear products list"
};

export const productsInitialValues = {
  productsListDB: [],
};

export const productsReducer = (state:any, action:Action) => {
  const {type,value} = action;
  if(type === productsTypes.setProductsList){
    return {
      ...state,
      productsListDB: [...value]
    };
  } else if(type === productsTypes.clearProductsList){
    return {
      ...state,
      productsListDB: []
    };
  } else{
    return state;
  }
};
