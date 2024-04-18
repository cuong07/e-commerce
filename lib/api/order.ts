import qs from 'query-string';

import { OrderV1 } from '@/constant/endpoint';
import requsetInstance from '@/interceptors/token-interceptor';
import { OrderDTO } from '@/type';

export const getPaymentNVPay = async (amount: number, orderInfo: string) => {
    const url = qs.stringifyUrl({
        url: OrderV1.GET_ORDER_PAYMENT_NVPAY,
        query: {
            amount,
            orderInfo: 'none',
        },
    });
    try {
        const response = await requsetInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_ORDER_PAYMENT_NVPAY_ERROR:', error);
        throw error;
    }
};

export const createOrderWithPayment = async (data: OrderDTO) => {
    const url = qs.stringifyUrl({
        url: OrderV1.CREATE_ORDER_PAYMENT_NVPAY,
    });
    try {
        const response = await requsetInstance.post(url, data);
        return response;
    } catch (error) {
        console.log('CREATE_ORDER_PAYMENT_NVPAY_ERROR:', error);
        throw error;
    }
};

export const createOrderCOD = async (data: OrderDTO) => {
    const url = qs.stringifyUrl({
        url: OrderV1.CREATE_ORDER_COD,
    });
    try {
        const response = await requsetInstance.post(url, data);
        return response;
    } catch (error) {
        console.log('CREATE_ORDER_COD:', error);
        throw error;
    }
};

export const getPaymentStatus = async () => {
    const url = qs.stringifyUrl({
        url: OrderV1.GET_PAYMENT_VNPAY_STATUS,
    });
    try {
        const response = await requsetInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_PAYMENT_VNPAY_STATUS_ERROR:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    const url = qs.stringifyUrl({
        url: OrderV1.GET_ALL_ORDER_BY_USER,
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));

    try {
        const response = await requsetInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_PAYMENT_VNPAY_STATUS_ERROR:', error);
        throw error;
    }
};
