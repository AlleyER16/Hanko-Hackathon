import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { tRootState } from "../../store";

// Makes sure user not logged in
export const withUnAuth =
  <P extends object>(Component: React.ComponentType) =>
  (props: P) => {
    const loggedIn = useSelector((state: tRootState) => state.auth.loggedIn);

    if (loggedIn) return <Navigate to="/profile" />;

    return <Component {...props} />;
  };

// Makes sure user logged in
const withAuth =
  <P extends object>(Component: React.ComponentType) =>
  (props: P) => {
    const loggedIn = useSelector((state: tRootState) => state.auth.loggedIn);

    if (!loggedIn) return <Navigate to="/sign-in" />;

    return <Component {...props} />;
  };

export default withAuth;
