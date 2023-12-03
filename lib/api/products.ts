import { productV1 } from "@/constant/endpoint";
import { request } from "@/lib/axios";

export const getProducts = async (page: number, limit: number) => {
  try {
    const response = await request(
      `${productV1.GET_PRODUCTS}?page=${page}&size=${limit}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
