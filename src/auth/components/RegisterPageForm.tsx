import { Link, useNavigate } from "react-router-dom";
import { RegisterQuestion } from "./RegisterQuestion";
import {
  REGISTER_QUESTIONS,
  RegisterError,
  formValuesRegister,
} from "../../models/registerModels";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  handleSubmit: UseFormHandleSubmit<formValuesRegister, undefined>;
  register: UseFormRegister<formValuesRegister>;
  confirmSubmit: (data: FieldValues) => void;
  setOnClick: (id: string, value: boolean) => void;
  REGISTER_DATA: Array<REGISTER_QUESTIONS>;
  registerError: RegisterError;
}

export const RegisterPageForm = ({
  handleSubmit,
  register,
  confirmSubmit,
  setOnClick,
  REGISTER_DATA,
  registerError,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        className="text-xl font-bold leading-tight tracking-tight
        text-gray-900 md:text-2xl dark:text-white"
      >
        Crear cuenta
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        action="#"
        onSubmit={handleSubmit((data) => confirmSubmit(data))}
      >
        {REGISTER_DATA.map((item) => (
          <RegisterQuestion
            key={item.id}
            id={item.id}
            order={item.order}
            htmlFor={item.htmlFor}
            placeHolder={item.placeHolder}
            typeInput={item.typeInput}
            emailState={registerError.email.state}
            emailMessage={registerError.email.message}
            passwordState={registerError.password.state}
            passwordMessage={registerError.password.message}
            confirmPasswordState={registerError.confirm_password.state}
            confirmPasswordMessage={registerError.confirm_password.message}
            register={register}
            setOnClick={setOnClick}
          />
        ))}
        <button
          type="submit"
          className="w-full text-white bg-red-600
        hover:bg-red-500 active:bg-red-700
        font-medium rounded-lg text-sm px-5 py-2.5
        text-center shadow-md"
        >
          Crear cuenta
        </button>
        <button
          onClick={() => navigate("/auth/login")}
          type="button"
          className="w-full text-white bg-red-600
        hover:bg-red-500 active:bg-red-700
        font-medium rounded-lg text-sm px-5 py-2.5
        text-center shadow-md"
        >
          Volver
        </button>
        <p
          className="text-sm font-light text-gray-500
        dark:text-gray-400"
        >
          ¿Ya tiene una cuenta?{" "}
          <Link
            to="login"
            className="font-medium text-primary-600
          hover:underline dark:text-primary-500"
          >
            Ingrese aquí
          </Link>
        </p>
      </form>
    </div>
  );
};
