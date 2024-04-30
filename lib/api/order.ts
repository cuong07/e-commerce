import qs from 'query-string';

import { OrderV1 } from '@/constant/endpoint';
import requestInstance from '@/interceptors/token-interceptor';
import { OrderDTO, OrderStatus } from '@/type';

export const getPaymentNVPay = async (amount: number, orderInfo: string) => {
    const url = qs.stringifyUrl({
        url: OrderV1.GET_ORDER_PAYMENT_NVPAY,
        query: {
            amount,
            orderInfo: 'none',
        },
    });
    try {
        const response = await requestInstance.get(url);
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
        const response = await requestInstance.post(url, data);
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
        const response = await requestInstance.post(url, data);
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
        const response = await requestInstance.get(url);
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
        const response = await requestInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_ALL_ORDER_BY_USER:', error);
        throw error;
    }
};

export const getOrders = async ({ page, limit, status }: { page: number; limit: number; status?: OrderStatus }) => {
    const url = qs.stringifyUrl({
        url: OrderV1.GET_ORDERS,
        query: {
            limit,
            page,
            status,
        },
    });
    try {
        const response = await requestInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_ORDERS:', error);
        throw error;
    }
};
