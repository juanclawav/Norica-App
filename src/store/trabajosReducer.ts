import { Action } from "../models/dataReducer";

export const trabajosTypes = {
  setWorkList: "set work list",
  clearWorkList: "clear work list"
};

export const trabajosInitialValues = {
  workList: [],
};

export const trabajosReducer = (state:any, action:Action) => {
  const {type,value} = action;
  if(type === trabajosTypes.setWorkList){
    return {
      ...state,
      workList: [...value]
    };
  } else if(type === trabajosTypes.clearWorkList){
    return {
      ...state,
      workList: []
    };
  } else{
    return state;
  }
};
