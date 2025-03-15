import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./layouts/app";
import Loader from "@/components/custom/Loader";
import PanelLayout from "./pages/panel/layout";

const Login = lazy(() => import("@/pages/auth/login"));
const RequiredAuth = lazy(() => import("@/pages/auth/required-auth"));
const Brand = lazy(() => import("@/pages/panel/SKU/brand/brand"));
const Category = lazy(() => import("@/pages/panel/SKU/category/category"));
const Product = lazy(() => import("@/pages/panel/SKU/product/product"));

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
            <Route path="/" element={<PanelLayout />}></Route>
            <Route path="/brands" element={<Brand />}></Route>
            <Route path="/categories" element={<Category />}></Route>
            <Route path="/products" element={<Product />}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
