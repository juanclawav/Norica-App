import { useMemo } from "react";
import { Link } from "react-router-dom";

interface Props {
  setZoomedIndex: (param: number | null) => void;
}

export const WorksPageButtonSection = ({ setZoomedIndex }: Props) => {
  const styleButton = (normal: string, hover: string, active: string) => {
    return `w-[150px] h-[45px] text-white ${normal} hover:${hover}
    active:${active} text-base font-thin rounded-[40px] `;
  };

  let buttonOneStyle: string = useMemo(
    () => styleButton("bg-red-600", "bg-black", "bg-gray-700"),
    [setZoomedIndex]
  );
  let buttonTwoStyle: string = useMemo(
    () => styleButton("bg-gray-600", "bg-red-600", "bg-red-700"),
    [setZoomedIndex]
  );

  return (
    <div className="ml-10 -mt-5 w-[550px] flex flex-row justify-start">
      <button
        className={buttonOneStyle + "mr-10"}
        onClick={() => setZoomedIndex(null)}
      >
        Volver
      </button>
      <Link className="w-max h-max " to={`/app/home/contratanos`}>
        <button className={buttonTwoStyle}>Contrátanos</button>
      </Link>
    </div>
  );
};
