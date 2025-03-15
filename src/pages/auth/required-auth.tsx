import Loader from "@/components/custom/Loader";
import useAuthCheck from "@/hooks/use-auth-check";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();
  const { authenticated, isPending } = useAuthCheck();

  if (isPending) {
    return <Loader />;
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default RequiredAuth;
