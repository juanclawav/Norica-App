import logoApp from "../../assets/logo-app.svg";
import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "../../store/StoreProvider";
import { types } from "../../store/storeReducer";
import { useEffect, useState } from "react";
import { ModalPage } from "../../modals/ModalPage";
import { ModalMessage } from "../../modals/ModalMessage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { googleProvider } from "../../firebase/providers";
import { LOGIN_DATA_QUESTIONS } from "../../data/loginData";
import { LoginQuestions } from "../components/LoginQuestions";
import { LoginQuestion, formValues } from "../../models/loginQuestion";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  const { saveDataLS } = useLocalStorage();

  const endLoginProcess = (user: User) => {
    saveDataLS("userLogIn", { auth: true });
    saveDataLS("userEmail", { userEmail: user.email });
    dispatch({ type: types.login, value: "" });
    dispatch({ type: types.getUserEmail, value: user.email });
    navigate("/app/home");
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      endLoginProcess(user);
    } catch (err) {
      setError(true);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      endLoginProcess(user);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    saveDataLS("userLogIn", { auth: false });
    saveDataLS("userEmail", { userEmail: "" });
    saveDataLS("addedProducts", { addedProducts: [] });
    dispatch({ type: types.logout, value: "" });
    dispatch({ type: types.clearWorkList, value: [] });
    dispatch({ type: types.eraseAddedProducts });
    dispatch({ type: types.eraseUserEmail, value: "" });
    dispatch({ type: types.clearProductsList });
  }, []);

  const whensubmit = (data: FieldValues) => {
    const { email, password } = data;
    signIn(email, password);
  };

  const LOGIN_DATA: LoginQuestion[] = [...LOGIN_DATA_QUESTIONS];
  LOGIN_DATA[0].error = errors.email;
  LOGIN_DATA[1].error = errors.password;

  return (
    <>
      {error && (
        <ModalPage>
          <ModalMessage
            action={setError}
            title="Sign In Error"
            message="Usuario y/o contraseña incorrectos"
          />
        </ModalPage>
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col justify-center items-center px-6 py-8 mx-auto
        md:h-screen lg:py-0"
        >
          <form
            onSubmit={handleSubmit((data) => whensubmit(data))}
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0
          sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex
          flex-col items-center"
          >
            <figure
              className="flex items-center mb-6 text-2xl font-semibold
            text-gray-900 dark:text-white w-48 mt-10"
            >
              <img className="w-full ml-3 mr-2" src={logoApp} alt="logo" />
            </figure>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full -mb-3">
              <h1
                className="text-xl font-bold leading-tight tracking-tight
              text-gray-900 md:text-2xl dark:text-white"
              >
                Bienvenido
              </h1>
              <>
                <LoginQuestions LOGIN_DATA={LOGIN_DATA} register={register} />
              </>
              <div
                className="flex flex-row flex-wrap justify-center
              items-center"
              >
                <button
                  type="submit"
                  className="w-full text-white bg-red-600
                hover:bg-red-500 active:bg-red-700 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center shadow-md mb-2"
                >
                  Sign in
                </button>
                <button
                  onClick={signInWithGoogle}
                  type="button"
                  className="text-white bg-sky-600
                  hover:bg-sky-500 active:bg-sky-700 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex
                  items-center shadow-md w-full justify-center mt-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841
                      8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7
                      2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882
                      5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0
                      5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088
                      1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ingresar con Google
                </button>
              </div>
            </div>
            <p
              className="text-sm font-light text-gray-500 dark:text-gray-400
            mb-6"
            >
              <Link
                to="/auth/recover-pwd"
                className="font-medium text-primary-600 hover:underline
            dark:text-primary-500"
              >
                ¿Olvidó su contraseña?
              </Link>
            </p>
            <p
              className="text-sm font-light text-gray-500 dark:text-gray-400
            mb-6"
            >
              ¿No tiene una cuenta?{" "}
              <Link
                to="/auth/register"
                className="font-medium text-primary-600 hover:underline
            dark:text-primary-500"
              >
                Regístrese
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
