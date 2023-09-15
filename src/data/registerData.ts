import { REGISTER_QUESTIONS } from "../models/registerModels";

export const INITIAL_REGISTER_ERROR = {
  email: {
    title: "",
    message: "",
    state: false,
  },
  password: {
    title: "",
    message: "",
    state: false,
  },
  confirm_password: {
    title: "",
    message: "",
    state: false,
  },
};

export const REGISTER_QUESTIONS_DATA:REGISTER_QUESTIONS[] = [
  {
    order: "Ingrese su email",
    typeInput: "email",
    placeHolder: "name@company.com",
    htmlFor: "email",
    id: "email",
  },
  {
    order: "Cree una contraseña",
    typeInput: "password",
    placeHolder: "contraseña",
    htmlFor: "password",
    id: "password",
  },
  {
    order: "Confirmar contraseña",
    typeInput: "password",
    placeHolder: "contraseña",
    htmlFor: "confirm-password",
    id: "confirm_password",
  },
];