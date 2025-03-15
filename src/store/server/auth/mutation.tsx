import { ADMIN_LOGIN } from "@/endpoint";
import { useAuthStore } from "@/store/client/useStore";
import { IResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface IAuthInput {
  email: string;
  password: string;
}

const loginUserFn = async (
  input: IAuthInput
): Promise<IResponse<{ accessToken: string }>> => {
  const response = await axios.post(ADMIN_LOGIN, input, {
    headers: {
      "Content-Type": "Application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
export default loginUserFn;

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const toHomePage = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: (
      input: IAuthInput
    ): Promise<IResponse<{ accessToken: string }>> => {
      return loginUserFn(input);
    },
    onSuccess: (data: IResponse<{ accessToken: string }>) => {
      if (data._metadata.status === 200) {
        setAuth({ accessToken: data._data.accessToken });
        toast.success("Login Successful");
        navigate(toHomePage, { replace: true, viewTransition: true });
      }
    },
    onError: () => {
      toast.error("Invalid Credentials");
    },
  });
};
