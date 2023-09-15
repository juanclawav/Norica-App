export interface BuyFormInterface{
  name:string;
  email:string;
  address:string;
  contactNumber:string;
  nit:string;
}

export interface BuyFormQuestionInterface{
  label:string;
  id: "name" | "email" | "address" | "contactNumber" | "nit";
  placeHolder: string;
}

export interface BuyFormErrorSetterInterface{
  value:string;
  setValue:(param:string)=>void;
}