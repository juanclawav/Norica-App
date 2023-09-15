import { UseFormRegister } from "react-hook-form";
import { HireForm } from "../../models/formHireModel";
import { ErrorMessage } from "../../auth/components/ErrorMessage";

interface Props {
  item: {
    id: string;
    order: string;
    placeholder: string;
    typeInput: string;
    messsageError: string;
    error: boolean;
    setOnClick: (value: boolean) => void;
  };
  register: UseFormRegister<HireForm>;
  minDate?: string;
  maxDate?: string;
}

export const QuestionHireForm = ({
  item,
  register,
  minDate,
  maxDate,
}: Props) => {
  const {
    id,
    order,
    placeholder,
    typeInput,
    messsageError,
    error,
    setOnClick,
  } = item;

  const STYLES_ON_CLASSNAME = `
    w-full p-3 text-black shadow-lg text-base
    bg-gray-100 outline-none rounded-2xl text-start
  `;

  return (
    <>
      <div className="w-96 h-max m-2">
        <p
          className="w-max h-5 text-black text-base m-2 mb-4
          font-medium"
        >
          {order}
        </p>
        {id === "date" && (
          <p className="text-slate-400 font-semibold mb-3 w-max m-2">
            Debe escoger la fecha en el siguiente rango:
            <br /> {minDate} al {maxDate}
          </p>
        )}
        {error && <ErrorMessage message={messsageError} />}
        {id === "email" ? (
          <input
            type={typeInput}
            {...register("email")}
            placeholder={placeholder}
            className={STYLES_ON_CLASSNAME}
            required
          />
        ) : id !== "constructionDescription" ? (
          <input
            type={typeInput}
            {...register(
              id === "name"
                ? "name"
                : id === "organizationName"
                ? "organizationName"
                : id === "date"
                ? "date"
                : "contactNumber"
            )}
            onClickCapture={() => setOnClick(true)}
            onAuxClick={() => setOnClick(false)}
            placeholder={placeholder}
            className={STYLES_ON_CLASSNAME}
            required
          />
        ) : (
          <textarea
            id={id}
            {...register("constructionDescription")}
            placeholder={placeholder}
            className="w-full p-3 text-black shadow-lg text-base
            bg-gray-100 outline-none rounded-2xl text-start resize-none
            h-48"
            required
          />
        )}
      </div>
    </>
  );
};
