import { CartData, CartDetailsData } from '@/type';
import { create } from 'zustand';

interface CartStore {
    cartDetails: CartDetailsData[];
    cart: CartData | null;
    getCart: (data: CartData) => void;
    setFetching: (data: boolean) => void;
    setCartDetail: (data: CartDetailsData) => void;
    deleteCartDetail: (id: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
    cart: null,
    cartDetails: [],
    isFetching: true,

    getCart: (data) =>
        set((state: CartStore) => ({
            ...state,
            cart: { ...data, cart_details: [] },
            cartDetails: data.cart_details,
        })),

    setFetching: (isLoading) => set((state: CartStore) => ({ ...state, isLoading: isLoading })),

    setCartDetail: (data) =>
        set((state: CartStore) => {
            console.log('Before Update:', state.cartDetails);

            // Create a new array with the updated item or added new item
            const updatedCartDetails = state.cartDetails.map((item) =>
                item.id === data.id ? { ...item, ...data } : item,
            );

            // If the item is not found, add it to the array
            if (!state.cartDetails.some((item) => item.id === data.id)) {
                updatedCartDetails.push(data);
            }

            console.log('After Update:', updatedCartDetails);
            return { ...state, cartDetails: updatedCartDetails };
        }),

    deleteCartDetail: (id) =>
        set((state: CartStore) => {
            const updatedCartDetails = state.cartDetails.filter((item) => item.id !== id);
            return { ...state, cartDetails: updatedCartDetails };
        }),
}));

export default useCartStore;
