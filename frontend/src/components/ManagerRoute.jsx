import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ManagerRoute = ({
  children,
}) => {
  const { user, loading } =
    useAuth();

  if (loading)
    return <h2>Loading...</h2>;

  return user?.role ===
    "manager" ? (
    children
  ) : (
    <Navigate
      to="/dashboard"
    />
  );
};

export default ManagerRoute;