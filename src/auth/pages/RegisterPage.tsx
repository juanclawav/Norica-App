import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { RegisterError } from "../../models/registerModels";
import { formValuesRegister } from "../../models/registerModels";
import { testEmail } from "../../helpers/testerEmail";
import {
  INITIAL_REGISTER_ERROR,
  REGISTER_QUESTIONS_DATA,
} from "../../data/registerData";
import { RegisterPageMessages } from "../components/RegisterPageMessages";
import { RegisterPageForm } from "../components/RegisterPageForm";

export const RegisterPage = () => {
  const { register, handleSubmit, watch } = useForm<formValuesRegister>();

  const [existError, setExistError] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false);
  const [confirmSend, setConfirmSend] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<FieldValues>([]);

  const emailVerification = (value: boolean) => {
    setCreated(value);
  };

  const email = watch("email");
  const password = watch("password");
  const confirm_password = watch("confirm_password");

  const confirmSubmit = (data: FieldValues) => {
    setDataForm(data);
    setConfirmSend(true);
  };

  const createNewUser = () => {
    setConfirmSend(false);
    whenSubmit(dataForm);
  };

  const whenSubmit = async (data: FieldValues) => {
    const { email, password, confirm_password } = data;
    if (![email, password, confirm_password].includes("")) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          if (
            !(
              registerError.email.state ||
              registerError.password.state ||
              registerError.confirm_password.state
            ) &&
            ![email, password, confirm_password].includes("")
          ) {
            const auxUser = auth.currentUser;
            if (auxUser !== null) {
              sendEmailVerification(auxUser)
                .then(() => {
                  setCreated(true);
                })
                .catch((err) => {
                  console.error(err);
                  setExistError(true);
                });
            }
          } else {
            setExistError(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setExistError(true);
        });
    } else {
      setExistError(true);
    }
  };

  const [clickOne, setClickOne] = useState<boolean>(false);
  const [clickTwo, setClickTwo] = useState<boolean>(false);
  const [clickThree, setClickThree] = useState<boolean>(false);

  const [registerError, setRegisterError] = useState<RegisterError>(
    INITIAL_REGISTER_ERROR
  );

  const setOnClick = (id: string, value: boolean) => {
    if (id === "email") {
      setClickOne(value);
    } else if (id === "password") {
      setClickTwo(value);
    } else {
      setClickThree(value);
    }
  };

  useEffect(() => {
    if (clickOne) {
      if (!testEmail(email)) {
        if (!registerError.email.state) {
          setRegisterError({
            ...registerError,
            email: {
              ...registerError.email,
              message: "* Debe ingresar un email valido",
              state: true,
            },
          });
        }
      } else {
        setRegisterError({
          ...registerError,
          email: {
            ...registerError.email,
            message: "",
            state: false,
          },
        });
      }
    }
  }, [email]);

  useEffect(() => {
    if (clickTwo) {
      const passwordVerificator =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,16}$/;
      const lengthPassword = /^.{8,16}$/;
      const oneSmallLetter = /[a-z]/;
      const oneBigLetter = /[A-Z]/;
      const oneNumber = /\d/;
      if (!passwordVerificator.test(password)) {
        let auxTextError = "";
        if (!lengthPassword.test(password)) {
          auxTextError = `* La contraseña debe contener al menos 8 caracteres
          y máximo 16`;
        } else if (!oneSmallLetter.test(password)) {
          auxTextError = "* La contraseña debe tener al menos 1 minúscula";
        } else if (!oneBigLetter.test(password)) {
          auxTextError = "* La contraseña debe tener al menos 1 mayúscula";
        } else if (!oneNumber.test(password)) {
          auxTextError = "* La constraseña debe tener al menos 1 número";
        }
        setRegisterError({
          ...registerError,
          password: {
            ...registerError.password,
            message: auxTextError,
            state: true,
          },
        });
      } else {
        setRegisterError({
          ...registerError,
          password: {
            ...registerError.password,
            message: "",
            state: false,
          },
        });
      }
    }
  }, [password]);

  useEffect(() => {
    if (clickThree) {
      if (confirm_password !== password) {
        if (!registerError.confirm_password.state) {
          setRegisterError({
            ...registerError,
            confirm_password: {
              ...registerError.confirm_password,
              message: "* Las contraseñas deben ser iguales",
              state: true,
            },
          });
        }
      } else {
        setRegisterError({
          ...registerError,
          confirm_password: {
            ...registerError.confirm_password,
            message: "",
            state: false,
          },
        });
      }
    }
  }, [confirm_password]);

  const REGISTER_DATA = [...REGISTER_QUESTIONS_DATA];

  return (
    <>
      <RegisterPageMessages
        confirmSend={confirmSend}
        created={created}
        existError={existError}
        setExistError={setExistError}
        setConfirmSend={setConfirmSend}
        email={email}
        emailVerification={emailVerification}
        createNewUser={createNewUser}
      />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto
        md:h-screen lg:py-0"
        >
          <div
            className="w-full bg-white rounded-lg shadow dark:border
            md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800
            dark:border-gray-700"
          >
            <RegisterPageForm
              handleSubmit={handleSubmit}
              register={register}
              confirmSubmit={confirmSubmit}
              setOnClick={setOnClick}
              REGISTER_DATA={REGISTER_DATA}
              registerError={registerError}
            />
          </div>
        </div>
      </section>
    </>
  );
};
