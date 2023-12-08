import { productV1 } from "@/constant/endpoint";
import { request } from "@/lib/axios";
import qs from "query-string";

type QueryString = {
  page: number;
  limit: number;
  keyword?: string;
  category_id?: number;
};

export const getProducts = async ({
  page,
  limit,
  keyword,
  category_id,
}: QueryString) => {
  const url = qs.stringifyUrl({
    url: productV1.GET_PRODUCTS,
    query: {
      page,
      limit,
      keyword,
      category_id,
    },
  });
  console.log(url);

  try {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await request(url);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getDetailProduct = async (productId: string) => {
  const url = qs.stringifyUrl({
    url: `${productV1.GET_DETAILS_PRODUCT}${productId}`,
  });
  try {
    const response = await request(url);
    return response;
  } catch (error: any) {
    throw error;
  }
};
