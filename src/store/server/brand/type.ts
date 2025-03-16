export type Brand = {
  id: string;
  name: string;
  salePercentage?: number;
  count?: number;
  totalPurchaseAmount?: number;
  totalSellingAmount?: number;
};

export type BrandResponse = {
  id: string;
  name: string;
  isDeleted: boolean;
  totalSale: number;
  totalPurchase: number;
  createdAt: string;
  updatedAt: string;
};
