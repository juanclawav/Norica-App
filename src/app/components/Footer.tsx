import { useRef } from "react";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { SocialNetworkButton } from "./SocialNetworkButton";

const Footer = () => {
  const element = useRef(null);

  const REDES_SOCIALES = [
    {
      socialNetworkName: "Facebook",
      icon: faFacebook,
      socialNetworkLink: "https://www.facebook.com/noricasrl?mibextid=LQQJ4d",
    },
    {
      socialNetworkName: "Instagram",
      icon: faInstagram,
      socialNetworkLink: "https://www.instagram.com",
    },
    {
      socialNetworkName: "Youtube",
      icon: faYoutube,
      socialNetworkLink: "https://www.youtube.com",
    },
  ];

  return (
    <footer ref={element} className="rounded-3xl bg-[#EBEBEB] w-full h-max m-3">
      <div
        className="w-full h-max p-7 bg-transparent rounded-3xl flex
        justify-between items-center text-white border-[0.5px]
        border-white"
      >
        <div
          className="grow shrink basis-0 h-max justify-around items-center
        flex flex-wrap"
        >
          <>
            {REDES_SOCIALES.map((item) => (
              <SocialNetworkButton
                key={item.socialNetworkName}
                socialNetworkName={item.socialNetworkName}
                socialNetworkLink={item.socialNetworkLink}
                icon={item.icon}
              />
            ))}
          </>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
