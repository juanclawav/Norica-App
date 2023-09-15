import { Image } from "./Image";

interface Props {
  productName: string;
  productImage: string;
  productDescription: string;
  productDescriptionZone: string;
  productDescriptionDuration: string;
  isZoomed: boolean;
  onZoomToggle: () => void;
}

export const FinishedProductCard = ({
  productName,
  productImage,
  productDescriptionDuration,
  onZoomToggle,
}: Props) => {
  return (
    <div
      onClick={onZoomToggle}
      className={` flex flex-wrap justify-center p-3 h-[450px] bg-opacity-50 rounded-[40px] hover:bg-gray-300 m-3
      `}
    >
      <div>
        <Image urlImg={productImage} widthLogo={"big"} />
        <h5 className=" text-xl mt-5 h-[50px] texto tracking-tight text-black dark:text-gray-900">
            {productName}
          </h5>
          </div>
        <section className ="flex flex-row justify-between  mt-0">
        <p className=" font-normal w-[275px] texto text-black-400 dark:text-gray-700">
          {productDescriptionDuration}
        </p>
          <svg
            className="w-3.5 h-3.5 m-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          </section>
    </div>
  );
};
