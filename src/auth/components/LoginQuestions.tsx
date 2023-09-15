import { UseFormRegister } from "react-hook-form";
import { LoginQuestion, formValues } from "../../models/loginQuestion";
import { DataInput } from "./DataInput";

interface Props {
  LOGIN_DATA: Array<LoginQuestion>;
  register: UseFormRegister<formValues>;
}

export const LoginQuestions = ({ LOGIN_DATA, register }: Props) => {
  return (
    <>
      {LOGIN_DATA.map((item) => (
        <div key={item.order}>
          <DataInput order={item.order} typeInput={item.typeInput} />
          <input
            type={item.typeInput}
            {...register(item.typeInput === "email" ? "email" : "password", {
              required: true,
            })}
            id={item.typeInput}
            className="bg-gray-50 border border-gray-300
            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
            focus:border-primary-600 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500
            outline-none"
            placeholder={item.placeHolder}
            required={true}
          />
        </div>
      ))}
    </>
  );
};
