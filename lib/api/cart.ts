import { CartDetailV1, CartV1 } from "@/constant/endpoint";
import requsetInstance from "@/interceptors/token-interceptor";
import { CartDetailsData } from "@/type";

export const getCurrentCartByUser = async () => {
  try {
    const response = await requsetInstance.get(CartV1.GET_CART_BY_USER);
    return response.data;
  } catch (error) {
    console.log("GET_CART_BY_USER_ERROR", error);
    throw error;
  }
};

export const updateCartDetail = async (data: CartDetailsData) => {
  try {
    const response = await requsetInstance.post(
      CartDetailV1.UPDATE_CART_DETAIL + data.id,
      data,
    );
    return response.data;
  } catch (error) {
    console.log("UPDATE_CART_DETAIL_BY_ID_ERROR", error);
    throw error;
  }
};
