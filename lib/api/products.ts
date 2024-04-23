import { productV1 } from '@/constant/endpoint';
import { request } from '@/lib/axios';
import { ProductDTO } from '@/type';
import qs from 'query-string';
import requestInstance from '@/interceptors/token-interceptor';

type QueryString = {
    page: number;
    limit: number;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
};

export const getProducts = async ({ page, limit, keyword, categoryId, minPrice, maxPrice }: QueryString) => {
    const url = qs.stringifyUrl({
        url: productV1.GET_PRODUCTS,
        query: {
            page,
            limit,
            keyword,
            min_price: minPrice,
            max_price: maxPrice,
            category_id: categoryId,
        },
    });
    try {
        // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        const response = await request(url);
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const getDetailProduct = async (productId: string) => {
    const url = qs.stringifyUrl({
        url: `${productV1.GET_DETAILS_PRODUCT}${productId}`,
    });
    try {
        // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        const response = await request(url);
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const createProduct = async (data: ProductDTO) => {
    const url = qs.stringifyUrl({
        url: productV1.CREATE_PRODUCT,
    });
    try {
        const response = await requestInstance.post(url, data);
        return response;
    } catch (error) {
        console.log('CREATE_PRODUCT:', error);
        throw error;
    }
};

export const updateProductImage = async (files: FileList | File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    const url = qs.stringifyUrl({
        url: productV1.PRODUCT_UPLOAD_IMAGES,
    });

    try {
        const response = await requestInstance.post(url, formData);
        return response;
    } catch (error) {
        console.log('UPDATE_PRODUCT_IMAGE:', error);
        throw error;
    }
};
