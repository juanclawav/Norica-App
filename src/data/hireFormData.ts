import { BooleanSetter } from "../helpers/voidSetter"

const CLICK_EVENT:BooleanSetter = (param:boolean)=>{console.log(param)};

export const questionsArrayHireForm = [
  {
    id: "email",
    order: "Escriba su email",
    placeholder: "Email",
    typeInput: "text",
    error: false,
    messsageError: "",
    setOnClick: CLICK_EVENT,
  },
  {
    id: "contactNumber",
    order: "Escriba su número de teléfono",
    placeholder: "Número teléfono",
    typeInput: "text",
    error: false,
    messsageError: "",
    setOnClick: CLICK_EVENT,
  },
  {
    id: "name",
    order: "Escriba su nombre",
    placeholder: "Nombre",
    typeInput: "text",
    error: false,
    messsageError: "",
    setOnClick: CLICK_EVENT,
  },
  {
    id: "organizationName",
    order: "Escriba el nombre de su organización/empresa",
    placeholder: "Empresa/Organización",
    typeInput: "text",
    error: false,
    messsageError: "",
    setOnClick: CLICK_EVENT,
  },
  {
    id: "constructionDescription",
    order: "Escriba una breve descripción del trabajo",
    placeholder: "Descripción",
    typeInput: "text",
    error: false,
    messsageError: "",
    setOnClick: CLICK_EVENT,
  },
  {
    id: "date",
    order: "Seleccione la fecha de inicio de la construcción",
    placeholder: "DD-MM-YYYY",
    typeInput: "date",
    error: false,
    messsageError: "",
    setOnClick: CLICK_EVENT,
  },
]