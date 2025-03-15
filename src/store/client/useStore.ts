import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import createAuthSlice, { AuthSlice } from "./auth.slice";

export const useStore = create<AuthSlice>((...a) => ({
  ...createAuthSlice(...a),
}));

export function useAuthStore() {
  const { auth, setAuth, resetAuth } = useStore(
    useShallow((state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      resetAuth: state.resetAuth,
    }))
  );

  return { auth, setAuth, resetAuth };
}

export default useStore;
