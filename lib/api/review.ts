import qs from 'query-string';
import { ReviewV1 } from '@/constant/endpoint';
import requsetInstance from '@/interceptors/token-interceptor';
import { request } from '../axios';

export const getReviewByProuductId = async (id: number, page: number = 0, limit: number = 10) => {
    const url = qs.stringifyUrl({
        url: ReviewV1.GET_REVIEWS_BY_PRODUCT + id,
        query: {
            page,
            limit,
        },
    });
    try {
        const response = await request.get(url);
        return response.data;
    } catch (error) {
        console.log('GET_REVIEWS_BY_PRODUCT_ERROR', error);
        throw error;
    }
};
