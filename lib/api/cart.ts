import { CartV1 } from "@/constant/endpoint";
import requsetInstance from "@/interceptors/token-interceptor";

export const getCurrentCartByUser = async () => {
  try {
    const response = await requsetInstance.get(CartV1.GET_CART_BY_USER);
    return response.data;
  } catch (error) {
    console.log("GET_CART_BY_USER_ERROR", error);
    throw error;
  }
};
