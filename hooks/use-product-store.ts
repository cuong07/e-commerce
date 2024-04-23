import { ProductData } from '@/type';
import { create } from 'zustand';

type ProductsResponse = {
    totalPages: number;
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
    productsSearchData: ProductData[] | null;
    totalPage: number;
    keyword: string;
    price: { minPrice: number; maxPrice: number };
    categoryId: number;
    nextPage: (count: number) => void;
    getListProduct: (data: ProductsResponse) => void;
    getProduct: (data: ProductData) => void;
    setFetching: (isLoading: boolean) => void;
    getKeyword: (value: string) => void;
    getCategoryId: (id: number) => void;
    getListProductsSearch: (data: ProductsResponse) => void;
    getPrice: (data: { minPrice: number; maxPrice: number }) => void;
}

const useProductStore = create<ProductStore>((set) => ({
    pagination: {
        page: 0,
        limit: 12,
    },
    productsData: null,
    product: null,
    productsSearchData: null,
    totalPage: 0,
    isLoading: true,
    keyword: '',
    price: {
        minPrice: 0,
        maxPrice: 999,
    },
    categoryId: 0,
    nextPage: (count: number) =>
        set((state: ProductStore) => ({
            ...state,
            pagination: { ...state.pagination, page: state.pagination.page + count },
        })),

    getListProduct: (data: ProductsResponse) =>
        set((state: ProductStore) => {
            let updatedProductsData = [];

            // If it's the first page (page === 0), don't append to the existing array
            if (state.pagination.page === 0) {
                updatedProductsData = data.products?.map((product) => ({
                    ...product,
                    url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
                }));
            } else {
                // If it's not the first page, append to the existing array
                const newProducts = data.products?.map((product) => ({
                    ...product,
                    url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
                }));
                updatedProductsData = [...(state.productsData || []), ...newProducts];
            }

            return {
                ...state,
                productsData: updatedProductsData,
                totalPage: data.totalPages,
            };
        }),

    getListProductsSearch: (data: ProductsResponse) =>
        set((state: ProductStore) => {
            let updatedProductsData = [];
            console.log(data);

            // If it's the first page (page === 0), don't append to the existing array
            if (state.pagination.page === 0) {
                updatedProductsData = data.products?.map((product) => ({
                    ...product,
                    url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
                }));
            } else {
                // If it's not the first page, append to the existing array
                const newProducts = data.products?.map((product) => ({
                    ...product,
                    url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
                }));
                // updatedProductsData = [...(state.productsData || []), ...newProducts];
                updatedProductsData = [...newProducts];
            }

            return {
                ...state,
                productsData: updatedProductsData,
                totalPage: data.totalPages,
            };
        }),

    getProduct: (data: ProductData) => set((state: ProductStore) => ({ ...state, product: data })),

    setFetching: (isLoading: boolean) => set((state: ProductStore) => ({ ...state, isLoading: isLoading })),

    getKeyword: (value: string) => set((state: ProductStore) => ({ ...state, keyword: value })),

    getPrice: (value) => set((state: ProductStore) => ({ ...state, price: value })),

    getCategoryId: (id) => set((state: ProductStore) => ({ ...state, categoryId: id })),
}));

export default useProductStore;
