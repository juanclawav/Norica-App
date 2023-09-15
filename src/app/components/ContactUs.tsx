import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface Props {
  width: number;
}

const Contact = ({ width }: Props) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/app/home/contacto");
  };

  return (
    <>
      <style>{`
        .contactStyles{
          font-size: 16px;
          font-weight: 100;
        }
      `}</style>
      <section
        className={`bg-transparent text-white flex flex-col
      ${width < 467 && "mt-5"}
      items-center`}
      >
        
        <button
          onClick={handleContactClick}
          className="contactStyles bg-black rounded-lg pl-6
          pr-6 pt-[14px] pb-[14px] border-[0.5px] border-black flex items-center
          hover:bg-slate-700 active:bg-black"
        >
          <FontAwesomeIcon className="w-5 h-5 mr-4" icon={faCommentDots} />
          <span>Contacto</span>
        </button>
      </section>
    </>
  );
};

export default Contact;