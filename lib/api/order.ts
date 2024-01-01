import { OrderV1 } from '@/constant/endpoint';
import requsetInstance from '@/interceptors/token-interceptor';
import { OrderDTO } from '@/type';
import qs from 'query-string';

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
