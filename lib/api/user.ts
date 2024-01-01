import qs from 'query-string';

import { userAddressV1, userV1 } from '@/constant/endpoint';
import requsetInstance from '@/interceptors/token-interceptor';
import { AddressDTO } from '@/type';

export const getCurrentUser = async () => {
    const url = qs.stringifyUrl({
        url: userV1.GET_CURRENT_USER,
    });
    try {
        const response = await requsetInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_CURRENT_USER_ERROR', error);
        throw error;
    }
};

export const createUserAddress = async (data: AddressDTO) => {
    const url = qs.stringifyUrl({
        url: userAddressV1.CREATE_USER_ADDRESS,
    });
    try {
        const response = await requsetInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.log('CREATE_USER_ADDRESS_ERROR', error);
        throw error;
    }
};

export const updateUserAddress = async (id: number, data: AddressDTO) => {
    const url = qs.stringifyUrl({
        url: userAddressV1.UPDATE_USER_ADDRESS + id,
    });
    try {
        const response = await requsetInstance.put(url, data);
        return response.data;
    } catch (error) {
        console.log('UPDATE_USER_ADDRESS_ERROR', error);
        throw error;
    }
};

export const deleteUserAddress = async (id: number) => {
    const url = qs.stringifyUrl({
        url: userAddressV1.DELETE_USER_ADDRESS + id,
    });
    try {
        const response = await requsetInstance.delete(url);
        return response.data;
    } catch (error) {
        console.log('DELETE_USER_ADDRESS_ERROR', error);
        throw error;
    }
};
