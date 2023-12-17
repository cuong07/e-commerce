import { CartData, CartDetailsData } from "@/type";
import { create } from "zustand";

interface CartStore {
  cartDetails: CartDetailsData[];
  cart: CartData | null;
  getCart: (data: CartData) => void;
  setFetching: (data: boolean) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: null,
  cartDetails: [],
  isFetching: true,
  getCart: (data: CartData) =>
    set((state: CartStore) => ({
      ...state,
      cart: { ...data, cart_details: [] },
      cartDetails: data.cart_details,
    })),
  setFetching: (isLoading: boolean) =>
    set((state: CartStore) => ({ ...state, isLoading: isLoading })),
}));

export default useCartStore;
