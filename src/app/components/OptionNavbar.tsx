import { Link } from "react-router-dom";

interface Props {
  option: string;
  path: string;
}

export const OptionNavbar = ({ option, path }: Props) => {
  return (
    <Link className="w-max h-max ml-3 mr-3" to={path}>
      <li
        className="w-max h-max p-2 hover:text-red-500
      active:text-slate-700 rounded-full mr-[20px]"
      >
        {option}
      </li>
    </Link>
  );
};
