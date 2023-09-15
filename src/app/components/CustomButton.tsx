interface Props {
  action?: () => void;
  textButton: string;
  normalBg: string;
  hoverBg: string;
  activeBg: string;
  textColor: string;
  typeButton: string;
  width: string;
  height: string;
}

export const CustomButton = ({
  action,
  textButton,
  normalBg,
  hoverBg,
  activeBg,
  textColor,
  typeButton,
  width,
  height,
}: Props) => {
  const type =
    typeButton === "button"
      ? "button"
      : typeButton === "reset"
      ? "reset"
      : "submit";
  const DIMENSION: string = `w-[${width}] h-[${height}]`;
  const STYLES: string = `${DIMENSION} m-3 ${normalBg}
  ${hoverBg} ${activeBg} rounded-3xl shadow justify-center items-center
  flex ${textColor} text-base font-semibold m-2 shadow-lg p-2`;
  return (
    <button type={type} onClick={action} className={STYLES}>
      {textButton}
    </button>
  );
};
