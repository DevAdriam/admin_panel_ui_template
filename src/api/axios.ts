import axios from "axios";
import useStore from "../store/client/useStore";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const axiosInstance = axios.create({ baseURL: BASE_URL });
export const authJsonHeader = (file?: boolean) => {
  return {
    "Content-Type": file ? "multipart/form-data" : "Application/json",
    Accept: "application/json",
    Authorization: `Bearer ${useStore.getState().auth.accessToken}`,
  };
};
