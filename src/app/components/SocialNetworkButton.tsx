import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  socialNetworkName: string;
  socialNetworkLink: string;
  icon: IconProp;
}

export const SocialNetworkButton = ({
  socialNetworkName,
  icon,
  socialNetworkLink,
}: Props) => {
  let textColor: string =
    socialNetworkName === "Facebook"
      ? "text-blue-600"
      : socialNetworkName === "Instagram"
      ? "text-pink-600"
      : "text-red-600";

  textColor = textColor + " text-lg";

  return (
    <div className="h-12 justify-start items-center flex w-[190px] m-1">
      {socialNetworkName === "Facebook" ? (
        <a
          href={socialNetworkName === "Facebook" ? socialNetworkLink : "#"}
          className="grow shrink basis-0 h-12 px-11 py-6 bg-white
          rounded-2xl justify-center items-center gap-2.5 flex
          cursor-pointer hover:bg-neutral-200 active:bg-neutral-300"
        >
          <FontAwesomeIcon icon={icon} className={textColor} />
          <span className="text-zinc-800 text-base font-semibold leading-tight">
            {socialNetworkName}
          </span>
        </a>
      ) : (
        <p
          className="grow shrink basis-0 h-12 px-11 py-6 bg-slate-100
          rounded-2xl justify-center items-center gap-2.5 flex
          cursor-pointer"
        >
          <FontAwesomeIcon icon={icon} className={textColor} />
          <span className="text-zinc-800 text-base font-semibold leading-tight">
            {socialNetworkName}
          </span>
        </p>
      )}
    </div>
  );
};
