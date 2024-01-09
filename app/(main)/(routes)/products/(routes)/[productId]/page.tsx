import React, { Suspense } from 'react';

import { getDetailProduct } from '@/lib/api/products';
import { ProductImage } from '@/type';
import { ProductDetail } from './(components)/product-detail';
import Skeleton from './(components)/skeleton';

interface ProductDetailPageProps {
    params: {
        productId: string;
    };
}

async function getProduct(productId: string) {
    try {
        const response = await getDetailProduct(productId);
        const imageUrl = response.data.productImages.map((img: ProductImage) => ({
            ...img,
            imageUrl: process.env.NEXT_PUBLIC_BASE_URL + img.imageUrl,
        }));
        const result = { ...response.data, productImages: imageUrl };
        return result;
    } catch (error) {
        console.log('GET_DETAIL_PRODUCT_ERROR: ' + error);
    }
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
    const { productId } = params;
    const product = await getProduct(productId);

    return (
        <div className="lg:px-[160px]">
            <Suspense fallback={<Skeleton />}>
                <ProductDetail product={product} />
            </Suspense>
        </div>
    );
};

export default ProductDetailPage;
