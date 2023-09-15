import { useEffect, useState } from "react";
import { ModalLoading } from "../../modals/ModalLoading";
import { ModalPage } from "../../modals/ModalPage";
import { EditableImage } from "../components/EditableImage";

const ContactoPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading && (
        <ModalPage>
          <ModalLoading />
        </ModalPage>
      )}
      <div className="flex flex-col w-full items-center" id="RootRoot">
        <h1
          className="text-6xl font-['Bruno_Ace'] leading-[50px] mb-10"
          id="Element7"
        >
          Comunicate con{" "}
          <span
            className=" text-right text-[#a40000]  contents content-center"
            id="Element5 text-1/2xl "
          >
            nosotros
          </span>
          <div className="contents" id="Element6">
            {" "}
          </div>
        </h1>
        <div className="self-stretch flex flex-row justify-around items-center">
          <div className="self-end flex flex-col gap-20 items-start">
            <div
              className=" text-1/2xl font-['Bruno_Ace'] leading-[25px] text-[#a40000] ml-1"
              id="Element9"
            >
              Telefonos:
              <br />
              <div className="contents text-[#000000]" id="Element8">
                <br />
                -60551854
                <br />
                <br />
                -72069759
                <br />
              </div>
            </div>
            <div
              className="font-['Bruno_Ace'] leading-[25px] text-[#a40000] mb-px ml-1 text-1/2xl"
              id="Element4"
            >
              Email
              <div className="text-1/2xl contents text-[#000000]" id="Element3">
                ;<br />
                <br />
                -ndica@gmail.com
                <br />
                <br />
                -ndica@gmail.com
                <br />
              </div>
            </div>
            <div
              className="font-['Bruno_Ace'] leading-[25px] text-[#a40000] text-1/2xl"
              id="Element2"
            >
              Direccion:
              <br />
              <div className="contents text-[#000000]" id="Element1 text-1/2xl">
                <br />
                Calle 15 de Calacoto. Av, Los Sauces
                <br />
              </div>
            </div>
          </div>
          <EditableImage
            urlImg={"https://file.rendit.io/n/1cXR8kuXm4PX81Aj6s6W.png"}
            styles={"rounded-lg shadow-md"}
            imageTitle={""}
          />
        </div>
      </div>
    </>
  );
};

export default ContactoPage;
