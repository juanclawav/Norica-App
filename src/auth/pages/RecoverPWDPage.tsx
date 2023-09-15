import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ModalPage } from "../../modals/ModalPage";
import { ModalMessage } from "../../modals/ModalMessage";
import { ErrorFinded } from "../../models/errorModel";
import { passwordReset } from "../../firebase/providers";

export const RecoverPWDPage = () => {
  const [email, setEmail] = useState<string>("");
  const [successNotification, setSuccessNotification] =
    useState<boolean>(false);

  const [errorExist, setErrorExist] = useState<ErrorFinded>({
    title: "",
    message: "",
    state: false,
  });
  const navigate = useNavigate();

  const emailExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      const condition: boolean = signInMethods.length > 0;
      if (!condition) {
        setErrorExist({
          title: "Error 404",
          message: "El usuario no existe",
          state: true,
        });
      }
      return condition;
    } catch (error) {
      setErrorExist({
        title: "Internal Error",
        message: "Vuelva a intentarlo",
        state: true,
      });
      return false;
    }
  };

  const resetPassword = async () => {
    const condition: boolean = await emailExists(email);
    if (condition) {
      await passwordReset(email);
      setSuccessNotification(true);
    }
  };

  const hideModal = (value: boolean) => {
    setErrorExist({
      title: "",
      message: "",
      state: value,
    });
  };

  return (
    <>
      {errorExist.state && (
        <ModalPage>
          <ModalMessage
            action={hideModal}
            title={errorExist.title}
            message={errorExist.message}
          />
        </ModalPage>
      )}
      {successNotification && (
        <ModalPage>
          <ModalMessage
            action={setSuccessNotification}
            title="Email enviado"
            message={`Se envió un correo a la dirección ${email}
            con los instrucciones para recuperar su contraseña`}
          />
        </ModalPage>
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto
        md:h-screen lg:py-0"
        >
          <div
            className="w-full p-6 bg-white rounded-lg shadow dark:border
          md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
          >
            <h2
              className="mb-1 text-xl font-bold leading-tight tracking-tight
            text-gray-900 md:text-2xl dark:text-white"
            >
              Cambiar contraseña
            </h2>

            <div className="mt-7">
              <label
                htmlFor="email"
                className="block mb-4 text-sm font-medium
                text-gray-900 dark:text-white"
              >
                Escriba su email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300
                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                focus:border-primary-600 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500
                outline-none mb-3"
                placeholder="name@company.com"
                required={true}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={resetPassword}
              className="w-full text-white bg-red-600 hover:bg-red-500
              font-medium rounded-lg text-sm px-5 py-2.5 text-center
              active:bg-red-700 mt-4 shadow-md"
            >
              Recuperar contraseña
            </button>
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="w-full text-white bg-red-600 hover:bg-red-500
              font-medium rounded-lg text-sm px-5 py-2.5 text-center
              active:bg-red-700 mt-4 shadow-md"
            >
              Volver
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
