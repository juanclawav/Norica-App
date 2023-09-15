import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  BuyFormErrorSetterInterface,
  BuyFormInterface,
  BuyFormQuestionInterface,
} from "../../models/buyForm";
import { useEffect, useRef, useState } from "react";
import { BUY_FORM_DATA } from "../../data/buyFormData";
import { BuyFormQuestion } from "./BuyFormQuestion";
import {
  descriptionValidator,
  evaluateJustLetters,
  evaluateLenght,
  evaluateSpell,
} from "../../helpers/validatorExpressionsHireForm";
import { ERRORS_BUY_FORM } from "../../helpers/errorsBuyForm";
import { testEmail } from "../../helpers/testerEmail";
import { validateNumber } from "../../helpers/numberValidator";
import { useStore } from "../../store/StoreProvider";
import { CustomButton } from "./CustomButton";
import { Product } from "../../models/productModel";

interface Props {
  setFindedError: (param: boolean) => void;
  register: UseFormRegister<BuyFormInterface>;
  setValue: UseFormSetValue<BuyFormInterface>;
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  nit: string;
  handleSubmit: UseFormHandleSubmit<BuyFormInterface, undefined>;
  sendingForm: (data: FieldValues) => void;
  cartProducts: Product[];
  findedError: boolean;
}

export const BuyForm = ({
  setFindedError,
  register,
  setValue,
  name,
  email,
  address,
  contactNumber,
  nit,
  handleSubmit,
  sendingForm,
  cartProducts,
  findedError,
}: Props) => {
  const STYLES_ON_CLASSNAME = `
    w-full p-3 text-black shadow-lg text-base
    bg-gray-100 outline-none rounded-2xl text-start
    resize-none
  `;

  const form = useRef<any>();

  const { userEmail } = useStore();

  const [errorName, setErrorName] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorAddress, setErrorAddress] = useState<string>("");
  const [errorContactNumber, setErrorContactNumber] = useState<string>("");
  const [errorNit, setErrorNit] = useState<string>("");
  const [errorStates, setErrorStates] = useState<boolean[]>([
    ...ERRORS_BUY_FORM.map((item) => item.errorState),
  ]);

  const ERROR_SETTER_ARRAY: BuyFormErrorSetterInterface[] = [
    {
      value: errorName,
      setValue: setErrorName,
    },
    {
      value: errorEmail,
      setValue: setErrorEmail,
    },
    {
      value: errorAddress,
      setValue: setErrorAddress,
    },
    {
      value: errorContactNumber,
      setValue: setErrorContactNumber,
    },
    {
      value: errorNit,
      setValue: setErrorNit,
    },
  ];

  const [dataBuyForm, setDaraBuyForm] = useState<BuyFormQuestionInterface[]>(
    []
  );

  useEffect(() => {
    const valueFindedError: boolean = errorStates.includes(true);
    setFindedError(valueFindedError);
  }, [errorStates]);

  useEffect(() => {
    const buyFormData: BuyFormQuestionInterface[] = [...BUY_FORM_DATA];
    setDaraBuyForm(buyFormData);
    setValue("email", userEmail);
  }, []);

  useEffect(() => {
    const errors: boolean[] = [...errorStates];
    if (name) {
      if (
        !evaluateLenght(2, 100, name) ||
        !evaluateJustLetters(name) ||
        !evaluateSpell(name)
      ) {
        let auxErrorState: boolean = true;
        let textError: string = "";
        if (!evaluateLenght(2, 100, name)) {
          textError = ERRORS_BUY_FORM[0].errorTwo;
        }
        if (!evaluateJustLetters(name)) {
          textError = ERRORS_BUY_FORM[0].errorOne;
        }
        if (!evaluateSpell(name)) {
          textError = ERRORS_BUY_FORM[0].generalError;
        }
        errors[0] = auxErrorState;
        setErrorName(textError);
      } else {
        errors[0] = false;
        setErrorName("");
      }
    } else {
      errors[0] = false;
      setErrorName("");
    }
    setErrorStates(errors);
  }, [name]);

  useEffect(() => {
    const errors: boolean[] = [...errorStates];
    if (email) {
      if (!testEmail(email)) {
        errors[1] = true;
        setErrorEmail(ERRORS_BUY_FORM[1].errorOne);
      } else {
        errors[1] = false;
        setErrorEmail("");
      }
    } else {
      errors[1] = false;
      setErrorEmail("");
    }
    setErrorStates(errors);
  }, [email]);

  useEffect(() => {
    const errors: boolean[] = [...errorStates];
    if (address) {
      if (!descriptionValidator(address) || !evaluateLenght(2, 500, address)) {
        let textError: string = "";
        let valueError: boolean = true;
        if (!evaluateLenght(2, 500, address)) {
          textError = ERRORS_BUY_FORM[2].errorOne;
        } else {
          textError = ERRORS_BUY_FORM[2].generalError;
        }
        setErrorAddress(textError);
        errors[2] = valueError;
      } else {
        errors[2] = false;
        setErrorAddress("");
      }
    } else {
      errors[2] = false;
      setErrorStates(errors);
    }
    setErrorStates(errors);
  }, [address]);

  useEffect(() => {
    const errors: boolean[] = [...errorStates];
    if (contactNumber) {
      if (!validateNumber(contactNumber, 8)) {
        errors[3] = true;
        setErrorContactNumber(ERRORS_BUY_FORM[3].errorOne);
      } else {
        errors[3] = false;
        setErrorContactNumber("");
      }
    } else {
      errors[3] = false;
      setErrorContactNumber("");
    }
    setErrorStates(errors);
  }, [contactNumber]);

  useEffect(() => {
    const errors: boolean[] = [...errorStates];
    if (nit) {
      if (!validateNumber(nit, 7)) {
        errors[4] = true;
        setErrorNit(ERRORS_BUY_FORM[4].errorOne);
      } else {
        errors[4] = false;
        setErrorNit("");
      }
    } else {
      errors[4] = false;
      setErrorNit("");
    }
    setErrorStates(errors);
  }, [nit]);

  return (
    <form ref={form} onSubmit={handleSubmit((data) => sendingForm(data))}>
      <h3 className="text-2xl m-2 font-medium">Formulario</h3>
      <>
        <>
          {dataBuyForm.map((item, index) => {
            if (index < 3) {
              return (
                <BuyFormQuestion
                  key={item.id}
                  dataQuestion={item}
                  STYLES_ON_CLASSNAME={STYLES_ON_CLASSNAME}
                  register={register}
                  BOX_QUESTION_STYLE={"mb-4"}
                  textError={ERROR_SETTER_ARRAY[index].value}
                  error={errorStates[index]}
                />
              );
            }
          })}
        </>
        <div className="flex flex-row justify-between items-end">
          <>
            {dataBuyForm.map((item, index) => {
              if (index >= 3) {
                return (
                  <BuyFormQuestion
                    key={item.id}
                    dataQuestion={item}
                    STYLES_ON_CLASSNAME={STYLES_ON_CLASSNAME + "w-44"}
                    register={register}
                    BOX_QUESTION_STYLE={"mb-4 w-44"}
                    textError={ERROR_SETTER_ARRAY[index].value}
                    error={errorStates[index]}
                  />
                );
              }
            })}
          </>
        </div>
      </>
      {cartProducts.length !== 0 && !findedError && (
        <div className="mr-6 flex flex-row justify-end mb-5">
          <CustomButton
            textButton={"Comprar"}
            normalBg={"bg-red-600 "}
            hoverBg={"hover:bg-black"}
            activeBg={"active:bg-gray-700"}
            textColor={"text-white"}
            typeButton={"submit"}
            width={"150px"}
            height={"45px"}
            action={() => {}}
          />
        </div>
      )}
    </form>
  );
};
