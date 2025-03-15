import Cookies from "js-cookie";
import { StateCreator } from "zustand";

type Auth = {
  accessToken: string;
};

export interface AuthSlice {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  resetAuth: () => void;
}

const initialAuth = { accessToken: "", refreshToken: "" };

const createAuthSlice: StateCreator<AuthSlice> = (set) => {
  const getToken = Cookies.get("accessToken");
  const initialAuthState: Auth = getToken
    ? { accessToken: getToken }
    : initialAuth;
  return {
    auth: initialAuthState,
    setAuth: (auth) =>
      set((state) => {
        Cookies.set("accessToken", auth.accessToken, {
          expires: 7,
          path: "/",
        });
        return { ...state, auth };
      }),
    resetAuth: () =>
      set((state) => {
        Cookies.remove("accessToken");
        return { ...state, auth: initialAuth };
      }),
  };
};

export default createAuthSlice;
