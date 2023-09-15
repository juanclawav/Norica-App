import { Navigate } from "react-router-dom";

interface Props {
  auth: boolean;
  children: JSX.Element;
}

export const GuardRoute = ({ auth, children }: Props) => {
  if (auth) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};
