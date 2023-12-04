import { ProductData } from "@/type";
import { create } from "zustand";

type ProductsResponse = {
  total_pages: number;
  products: ProductData[];
};

interface ProductStore {
  pagination: {
    page: number;
    limit: number;
  };
  productsData: ProductData[] | null;
  product: ProductData | null;
  totalPage: number;
  nextPage: (count: number) => void;
  getListProduct: (data: ProductsResponse) => void;
  getProduct: (data: ProductData) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  pagination: {
    page: 0,
    limit: 12,
  },
  productsData: null,
  product: null,
  totalPage: 0,
  nextPage: (count: number) =>
    set((state: ProductStore) => ({
      ...state,
      pagination: { ...state.pagination, page: state.pagination.page + count },
    })),

  getListProduct: (data: ProductsResponse) =>
    set((state: ProductStore) => ({
      ...state,
      productsData: data.products.map((product) => {
        return {
          ...product,
          url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
        };
      }),
      totalPage: data.total_pages,
    })),

  getProduct: (data: ProductData) =>
    set((state: ProductStore) => ({ ...state, product: data })),
}));

export default useProductStore;
