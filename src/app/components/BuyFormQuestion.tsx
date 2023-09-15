import { UseFormRegister } from "react-hook-form";
import {
  BuyFormInterface,
  BuyFormQuestionInterface,
} from "../../models/buyForm";
import { ErrorMessage } from "../../auth/components/ErrorMessage";

interface Props {
  dataQuestion: BuyFormQuestionInterface;
  STYLES_ON_CLASSNAME: string;
  register: UseFormRegister<BuyFormInterface>;
  BOX_QUESTION_STYLE: string;
  textError: string;
  error: boolean;
}

export const BuyFormQuestion = ({
  dataQuestion,
  STYLES_ON_CLASSNAME,
  register,
  BOX_QUESTION_STYLE,
  textError,
  error,
}: Props) => {
  const { label, id, placeHolder } = dataQuestion;
  return (
    <div className={BOX_QUESTION_STYLE}>
      {error && <ErrorMessage message={textError} />}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {id === "address" ? (
        <textarea
          {...register("address")}
          id={id}
          name={id}
          className={STYLES_ON_CLASSNAME}
          placeholder={placeHolder}
          required={true}
        ></textarea>
      ) : (
        <input
          {...register(
            id === "name"
              ? "name"
              : id === "email"
              ? "email"
              : id === "contactNumber"
              ? "contactNumber"
              : "nit"
          )}
          type="text"
          id={id}
          name={id}
          className={STYLES_ON_CLASSNAME}
          placeholder={placeHolder}
          required={true}
        />
      )}
    </div>
  );
};
