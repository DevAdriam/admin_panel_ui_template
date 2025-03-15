import { useEffect, useState } from "react";
import { useAuthStore } from "../store/client/useStore";
import { GET_ADMIN_PROFILE } from "../endpoint";

const useAuthCheck = () => {
  const { auth } = useAuthStore();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.accessToken) {
        setAuthenticated(false);
        setIsPending(false);
        return;
      }

      try {
        const response = await getProfile(auth.accessToken);
        setAuthenticated(response);
      } catch (error: unknown) {
        setAuthenticated(false);
        console.error(error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [auth.accessToken]); // ✅ Runs only when `auth.accessToken` actually changes

  return { isPending, authenticated };
};

const getProfile = async (token: string) => {
  if (!token) return false; // ✅ Prevents unnecessary API calls

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}${GET_ADMIN_PROFILE}`,
      { headers }
    );

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default useAuthCheck;
