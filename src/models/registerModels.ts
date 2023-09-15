import { ErrorFinded } from "./errorModel";

export interface RegisterError{
  email: ErrorFinded;
  password: ErrorFinded;
  confirm_password: ErrorFinded;
};

export interface formValuesRegister {
  email: string;
  password: string;
  confirm_password: string;
}

export interface REGISTER_QUESTIONS{
  order:string;
  typeInput:string;
  placeHolder:string;
  htmlFor:string;
  id:string;
};