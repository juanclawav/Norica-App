import { FieldError } from "react-hook-form";

export interface formValues {
  email: string;
  password: string;
}

export interface LoginQuestion{
  order: string;
  typeInput: string;
  placeHolder: string;
  error?: FieldError;
}