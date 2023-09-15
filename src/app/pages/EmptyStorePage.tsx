import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";

export const EmptyStorePage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-[800px] flex flex-col justify-center items-center">
      <p className="text-4xl text-black font-bold text-center">
        Disculpa, todos nuestros productos se encuentran agotados :/
      </p>
      <CustomButton
        textButton={"Volver al Inicio"}
        normalBg={"bg-red-600"}
        hoverBg={"hover:bg-red-500"}
        activeBg={"active:bg-red-700"}
        textColor={"text-white"}
        typeButton={"button"}
        width={"128px"}
        height={"48px"}
        action={() => navigate("/app/home")}
      />
    </section>
  );
};
