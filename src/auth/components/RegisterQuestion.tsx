import { useState } from "react";
import { DataInput } from "./DataInput";
import { ErrorMessage } from "./ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { formValuesRegister } from "../../models/registerModels";
import { UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  order: string;
  htmlFor: string;
  placeHolder: string;
  typeInput: string;

  emailState: boolean;
  emailMessage: string;

  passwordState: boolean;
  passwordMessage: string;

  confirmPasswordState: boolean;
  confirmPasswordMessage: string;

  register: UseFormRegister<formValuesRegister>;

  setOnClick: (id: string, value: boolean) => void;
}

export const RegisterQuestion = ({
  id,
  order,
  htmlFor,
  placeHolder,
  typeInput,
  emailState,
  emailMessage,
  passwordState,
  passwordMessage,
  confirmPasswordState,
  confirmPasswordMessage,
  register,
  setOnClick,
}: Props) => {
  const [eyeState, setEyeState] = useState<boolean>(false);

  return (
    <div key={order}>
      <DataInput order={order} typeInput={htmlFor} />
      {id === "email" && emailState && <ErrorMessage message={emailMessage} />}
      {id === "password" && passwordState && (
        <ErrorMessage message={passwordMessage} />
      )}
      {id === "confirm_password" && confirmPasswordState && (
        <ErrorMessage message={confirmPasswordMessage} />
      )}
      <div className="flex flex-row items-center w-full">
        <input
          type={
            !typeInput.includes("password")
              ? typeInput
              : eyeState
              ? "text"
              : typeInput
          }
          {...register(
            id === "email"
              ? "email"
              : id === "password"
              ? "password"
              : "confirm_password"
          )}
          id={htmlFor}
          placeholder={placeHolder}
          className="bg-gray-50 border border-gray-300
          text-gray-900 sm:text-sm rounded-lg
          focus:ring-primary-600
          focus:border-primary-600 block w-full p-2.5
          dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500 outline-none"
          onClickCapture={() => setOnClick(id, true)}
          onAuxClickCapture={() => setOnClick(id, false)}
        />
        {id.includes("password") && (
          <button
            className="p-1 m-1 rounded-md shadow-md
            hover:bg-gray-200 active:bg-gray-300
            flex justify-center items-center"
            type="button"
            onClick={() => setEyeState(!eyeState)}
          >
            {eyeState ? (
              <FontAwesomeIcon className="w-5 h-5" icon={faEye} />
            ) : (
              <FontAwesomeIcon className="w-5 h-5" icon={faEyeSlash} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
