import { CartDetailV1, CartV1 } from '@/constant/endpoint';
import requsetInstance from '@/interceptors/token-interceptor';
import qs from 'query-string';
import { CartDetailDTO, CartDetailsData } from '@/type';

export const getCurrentCartByUser = async () => {
    try {
        const response = await requsetInstance.get(CartV1.GET_CART_BY_USER);
        return response.data;
    } catch (error) {
        console.log('GET_CART_BY_USER_ERROR', error);
        throw error;
    }
};

export const updateCartDetail = async (data: CartDetailsData) => {
    try {
        const response = await requsetInstance.post(CartDetailV1.UPDATE_CART_DETAIL + data.id, data);
        return response.data;
    } catch (error) {
        console.log('UPDATE_CART_DETAIL_BY_ID_ERROR', error);
        throw error;
    }
};

export const updateQuantityCartDetail = async (id: number, quantity: number) => {
    const url = qs.stringifyUrl({
        url: CartDetailV1.UPDATE_QUANTITY_CART_DETAIL,
        query: {
            id,
            quantity,
        },
    });
    try {
        const response = await requsetInstance.put(url);
        return response.data;
    } catch (error) {
        console.log('UPDATE_QUANTITY_CART_DETAIL_BY_ID_ERROR', error);
        throw error;
    }
};

export const deleteCartDetailById = async (id: number) => {
    const url = qs.stringifyUrl({
        url: CartDetailV1.DELETE_CART_DETAIL + id,
    });
    try {
        const response = await requsetInstance.delete(url);
        return response.data;
    } catch (error) {
        console.log('DELETE_CART_DETAIL_BY_ID_ERROR', error);
        throw error;
    }
};

export const createCartDetail = async (data: CartDetailDTO) => {
    const url = qs.stringifyUrl({
        url: CartDetailV1.CREATE_CART_DETAIL,
    });
    try {
        const response = await requsetInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.log('CREATE_CART_DETAIL_BY_ID_ERROR', error);
        throw error;
    }
};
