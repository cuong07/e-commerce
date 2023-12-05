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
  isLoading: boolean;
  productsData: ProductData[] | null;
  product: ProductData | null;
  totalPage: number;
  nextPage: (count: number) => void;
  getListProduct: (data: ProductsResponse) => void;
  getProduct: (data: ProductData) => void;
  setFetching: (isLoading: boolean) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  pagination: {
    page: 0,
    limit: 12,
  },
  productsData: null,
  product: null,
  totalPage: 0,
  isLoading: true,

  nextPage: (count: number) =>
    set((state: ProductStore) => ({
      ...state,
      pagination: { ...state.pagination, page: state.pagination.page + count },
    })),

  getListProduct: (data: ProductsResponse) =>
    set((state: ProductStore) => ({
      ...state,
      productsData: [
        ...(state.productsData || []),
        ...data.products.map((product) => ({
          ...product,
          url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
        })),
      ],
      totalPage: data.total_pages,
    })),

  getProduct: (data: ProductData) =>
    set((state: ProductStore) => ({ ...state, product: data })),

  setFetching: (isLoading: boolean) =>
    set((state: ProductStore) => ({ ...state, isLoading: isLoading })),
}));

export default useProductStore;
