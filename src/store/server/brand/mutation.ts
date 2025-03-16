import { authJsonHeader, axiosInstance } from "@/api/axios";
import { CREATE_BRAND, DELETE_BRAND, UPDATE_BRAND } from "@/endpoint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createBrand = async (name: string) => {
  const response = await axiosInstance.post(
    CREATE_BRAND,
    { name },
    {
      headers: authJsonHeader(),
    }
  );
  return response.data;
};

const deleteBrand = async (id: string) => {
  const response = await axiosInstance.delete(`${DELETE_BRAND}/${id}`, {
    headers: authJsonHeader(),
  });

  return response.data;
};

const updateBrand = async (id: string, name: string) => {
  const response = await axiosInstance.patch(
    `${UPDATE_BRAND}/${id}`,
    { name },
    {
      headers: authJsonHeader(),
    }
  );

  return response.data;
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateBrand(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Successfully deleted brand");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Successfully deleted brand");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createBrand(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Brand created successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
