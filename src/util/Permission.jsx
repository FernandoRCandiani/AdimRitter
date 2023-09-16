import { Navigate } from "react-router-dom";

import { isAuth } from "../services/auth";

export const Permission = () => (Component) => (props) => {
  return isAuth()
    ? <Component {...props} />
    : <Navigate to="/" />;
};