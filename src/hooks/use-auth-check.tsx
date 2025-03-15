import { useEffect, useState } from "react";
import { useAuthStore } from "../store/client/useStore";
import { GET_ADMIN_PROFILE } from "../endpoint";
import { axiosInstance } from "@/api/axios";

const useAuthCheck = () => {
  const { auth } = useAuthStore();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(auth);
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
  }, [auth, auth.accessToken]);

  return { isPending, authenticated };
};

const getProfile = async (token: string) => {
  if (!token) return false;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(GET_ADMIN_PROFILE, { headers });
    return !!response.data._data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default useAuthCheck;
