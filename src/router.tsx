import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./layouts/app";
import Loader from "@/components/custom/Loader";

const Login = lazy(() => import("@/pages/auth/login"));
const RequiredAuth = lazy(() => import("@/pages/auth/required-auth"));
const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"));

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="login"
          element={<Login />}
          errorElement={<div>Error ...</div>}
        />

        {/* Private Routes */}
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<App />} errorElement={<div>Error ...</div>}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/orders" element={<Dashboard />}></Route>
            <Route path="/customers" element={<Dashboard />}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
