import { BuyFormQuestionInterface } from "../models/buyForm";

export const BUY_FORM_DATA:BuyFormQuestionInterface[] = [
  {
    label:"Nombre:",
    id: "name",
    
    placeHolder: "Escriba su nombre"
  },
  {
    label:"E-mail:",
    id: "email",
    
    placeHolder: "Escriba su dirección de e-mail"
  },
  {
    label:"Dirección de entrega:",
    id: "address",
    
    placeHolder: "Escriba su dirección de entrega"
  },
  {
    label:"Teléfono de contacto:",
    id: "contactNumber",
    
    placeHolder: "Teléfono de contacto"
  },
  {
    label:"NIT:",
    id: "nit",
    
    placeHolder: "Datos para la factura"
  },
];

