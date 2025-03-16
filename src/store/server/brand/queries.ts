import { authJsonHeader, axiosInstance } from "@/api/axios";
import { FETCH_BRAND } from "@/endpoint";
import { IPaginatedResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Brand, BrandResponse } from "./type";

const fetchBrand = async (): Promise<
  IPaginatedResponse<BrandResponse[] | []>
> => {
  const response = await axiosInstance.get(
    `${FETCH_BRAND}?page=${1}&size=${10}`,
    {
      headers: authJsonHeader(),
    }
  );
  return response.data;
};

export const useFetchBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => fetchBrand(),
    select: (data) => {
      const brandList: Brand[] = data._data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          count: 0,
          salePercentage: 0,
          totalPurchaseAmount: item.totalPurchase,
          totalSellingAmount: item.totalSale,
        };
      });
      return brandList;
    },
  });
};
