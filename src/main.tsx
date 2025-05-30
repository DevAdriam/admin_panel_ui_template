import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AxiosError } from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";
import Router from "./router.tsx";
import handleServerError from "./utils/handleServerError.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_, error) => {
        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        );
      },
      refetchOnWindowFocus: import.meta.env.PROD,
    },
    mutations: {
      onError: (error) => handleServerError(error),
    },
  },
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.error(error.response.data);
      }
      if (error instanceof AxiosError && error.response?.status === 403) {
        console.error(error.response.data);
      }
    },
  }),
});

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<Router />} />)
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  </StrictMode>
);
