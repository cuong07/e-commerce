'use client';

import React, { useEffect } from 'react';
import Skeleton from '../../(components)/skeleton';
import { CardProduct } from '@/components/card/card-product';
import { getProducts } from '@/lib/api/products';
import { useModalStore } from '@/hooks/use-modal-store';
import useProductStore from '@/hooks/use-product-store';
import { ProductData } from '@/type';
import { LoadMore } from '@/components/load-more';
import ScrollTop from '@/components/scroll-top';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
    const router = useRouter();
    const {
        productsData,
        totalPage,
        isLoading,
        keyword,
        categoryId,
        getListProductsSearch,
        nextPage,
        setFetching,
        price,
    } = useProductStore();
    const { onOpen } = useModalStore();

    useEffect(() => {
        (async function () {
            const { maxPrice, minPrice } = price;
            try {
                const response = await getProducts({ page: 0, limit: 48, keyword, categoryId, minPrice, maxPrice });
                getListProductsSearch(response?.data);
                setFetching(false);
            } catch (error: any) {
                setFetching(false);
                if (error.response) {
                    onOpen('error', {
                        message: error.response.data,
                        code: error.response.status,
                    });
                } else {
                    onOpen('error', {
                        message: error.message,
                        code: error.code,
                    });
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, price, categoryId]);

    const handleClickCard = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        router.push('/products/' + id);
    };

    return (
        <div className=" gap-4 container mx-auto">
            {isLoading && <Skeleton numberElement={12} />}
            {!isLoading && (
                <div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {productsData?.map((product: ProductData, index: number) => (
                            <CardProduct product={product} handleClick={handleClickCard} key={index} />
                        ))}
                    </div>
                    {totalPage > 1 && (
                        <>
                            <LoadMore loadMore={nextPage} skeleton={<Skeleton numberElement={8} />} />
                            <ScrollTop />
                        </>
                    )}
                    {totalPage === 0 && <h1 className="text-center text-3xl">Not found products</h1>}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
