import { useState } from "react";
import { Link } from "react-router-dom";
import { OptionNavbar } from "./OptionNavbar";
import { LogoApp } from "./LogoApp";
import { OptionsNavBar } from "../../models/navbarModel";
import { ModalPage } from "../../modals/ModalPage";
import { ModalConfirmation } from "../../modals/ModalConfirmation";
import { useDispatch } from "../../store/StoreProvider";
import { types } from "../../store/storeReducer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import carritoImage from "../../assets/carrito.png";

interface Props {
  width: number;
}

const Navbar = ({ width }: Props) => {
  const HOME_PATH: string = "/app/home";

  const OPTION_LIST: OptionsNavBar[] = [
    {
      option: "Home",
      path: `${HOME_PATH}`,
    },
    {
      option: "Contratanos",
      path: `${HOME_PATH}/contratanos`,
    },
    {
      option: "Trabajos",
      path: `${HOME_PATH}/trabajos`,
    },
    {
      option: "Productos",
      path: `${HOME_PATH}/productos`,
    },
    {
      option: "Contacto",
      path: `${HOME_PATH}/contacto`,
    },
  ];

  const dispatch = useDispatch();
  const [askLogOut, setAskLogOut] = useState<boolean>(false);
  const { saveDataLS } = useLocalStorage();

  return (
    <>
      {askLogOut && (
        <ModalPage>
          <ModalConfirmation
            actionOne={() => {
              setAskLogOut(false);
              saveDataLS("userLogIn", { auth: false });
              saveDataLS("userEmail", { userEmail: "" });
              saveDataLS("addedProducts", { addedProducts: [] });
              dispatch({ type: types.eraseUserEmail, value: "" });
              dispatch({ type: types.logout });
              dispatch({ type: types.clearWorkList, value: [] });
              dispatch({ type: types.eraseAddedProducts });
              dispatch({ type: types.clearProductsList });
            }}
            actionTwo={() => setAskLogOut(false)}
            title={"¿Cerrar sesión?"}
            message={`La sesión se cerrará y perderá todos los productos agregados
            en el carrito de compras`}
          />
        </ModalPage>
      )}
      <nav
        className={`p-4 flex items-center
        ${width > 530 ? "flex-row" : "flex-col"} flex-wrap justify-between`}
      >
        <section className="flex items-center">
          <button className="ml-5 mr-5 p-1" onClick={() => setAskLogOut(true)}>
            <LogoApp />
          </button>
        </section>
        <section
          className="text-black relative top-0 right-0 bg-transparent
          flex items-center flex-wrap"
        >
          <ul
            className={`text-black flex 
            ${width < 743 && "mt-5"}
            ${width > 530 ? "flex-row" : "flex-col"}
          flex-row flex-wrap w-max texto`}
            style={{
              // Ajusta la alineación y el espacio entre elementos aquí
              marginRight: "125px", // Ejemplo: margen derecho de 20px
              // text-align: "center", // Para alinear el texto al centro
            }}
          >
            {OPTION_LIST.map((option) => (
              <OptionNavbar
                key={option.option}
                option={option.option}
                path={option.path}
              />
            ))}
          </ul>
          <Link
            to="/app/home/carrito"
            style={{ marginLeft: "20px", marginTop: "5px" }}
          >
            <img
              src={carritoImage}
              alt="Carrito"
              style={{
                width: "25px",
                height: "25px",
                flexShrink: 0,
                // Agrega propiedades de posición aquí, por ejemplo:
                position: "absolute",
                top: "5px",
                right: "80px",
              }}
            />
          </Link>
        </section>
      </nav>
      <div
        className="m-1 p-[0.1px] bg-[#000] w-[90%] flex
      self-center"
      />
    </>
  );
};

export default Navbar;
