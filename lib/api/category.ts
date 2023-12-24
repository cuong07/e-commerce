import { categoryV1 } from '@/constant/endpoint';
import { request } from '../axios';
import qs from 'query-string';
interface QueryString {
    page?: number;
    limit?: number;
}
export const getCategories = async ({ page, limit }: QueryString) => {
    const url = qs.stringifyUrl({
        url: categoryV1.GET_CATEGORIES,
        query: {
            page,
            limit,
        },
    });
    try {
        const response = await request.get(url);
        return response.data;
    } catch (error: any) {
        console.log('GET_CATEGORY_ERROR: ', error);
        throw error;
    }
};
