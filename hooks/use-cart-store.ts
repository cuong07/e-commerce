import { CartData, CartDetailsData } from '@/type';
import { create } from 'zustand';

interface CartStore {
    cartDetails: CartDetailsData[];
    cart: CartData | null;
    totalMoney: number;
    getCart: (data: CartData) => void;
    setFetching: (data: boolean) => void;
    setCartDetail: (data: CartDetailsData) => void;
    deleteCartDetail: (id: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
    cart: null,
    cartDetails: [],
    isFetching: true,
    totalMoney: parseFloat(localStorage.getItem('totalCart') || '0'),

    getCart: (data) =>
        set((state: CartStore) => ({
            ...state,
            cart: { ...data, cartDetails: [] },
            cartDetails: data.cartDetails,
        })),

    setFetching: (isLoading) => set((state: CartStore) => ({ ...state, isLoading: isLoading })),

    setCartDetail: (data) =>
        set((state: CartStore) => {
            // Create a new array with the updated item or added new item
            const updatedCartDetails = state.cartDetails.map((item) =>
                item.id === data.id ? { ...item, ...data } : item,
            );

            // If the item is not found, add it to the array
            if (!state.cartDetails.some((item) => item.id === data.id)) {
                updatedCartDetails.push(data);
            }

            const totalCart = updatedCartDetails.reduce((total, product: CartDetailsData) => {
                const productCost = product.price * product.numberOfProduct;
                return total + productCost;
            }, 0);

            localStorage.setItem('totalCart', JSON.stringify(totalCart));

            return { ...state, cartDetails: updatedCartDetails, totalMoney: totalCart };
        }),

    deleteCartDetail: (id) =>
        set((state: CartStore) => {
            const updatedCartDetails = state.cartDetails.filter((item) => item.id !== id);
            const totalCart = updatedCartDetails.reduce((total, product: CartDetailsData) => {
                const productCost = product.price * product.numberOfProduct;
                return total + productCost;
            }, 0);
            localStorage.setItem('totalCart', JSON.stringify(totalCart));
            return { ...state, cartDetails: updatedCartDetails, totalMoney: totalCart };
        }),
}));

export default useCartStore;
