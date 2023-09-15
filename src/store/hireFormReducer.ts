import { Action } from "../models/dataReducer";

export const hireFormTypes = {
  getUserEmail: "get user email",
  eraseUserEmail: "erase user email"
};

export const hireFormInitialValues = {
  userEmail: localStorage.getItem("userEmail")!==null ? JSON.parse(localStorage.getItem("userEmail") || "{}").userEmail : ""
};

export const hireFormReducer = (state:any, action:Action) => {
  const type:string = action.type;
  if(type === hireFormTypes.getUserEmail){
    return {
      ...state,
      userEmail: action.value
    };
  } else if(type === hireFormTypes.eraseUserEmail){
    return {
      ...state,
      userEmail: ""
    };
  } else{
    return state;
  }
};
