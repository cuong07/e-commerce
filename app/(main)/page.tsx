'use client';

import React, { useEffect, useRef, useState } from 'react';
import BannerSlide from '@/components/banner/banner-slide';
import useOnScreen from '@/hooks/use-on-screen';
import { BannerCategory } from '@/components/banner/banner-category';
import { getCategories } from '@/lib/api/category';
import { useEffectOneCall } from '@/hooks/use-effect-one-call';
import { CategoryData, ProductData, LocationStoreData } from '@/type';
import { getProducts } from '@/lib/api/products';
import { CardProduct } from '@/components/card/card-product';
import { useRouter } from 'next/navigation';
import StoreLocation from '@/components/map/store-location';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const listStoreLocation: LocationStoreData[] = [
    {
        lng: 106.76188702559595,
        lat: 10.823355651356884,
        name: 'Cửa hàng số 1',
        image: 'https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Stfi_LouisVuitton_SAKS_AmericanDream_1_DI3.jpg?wid=490',
        addess: '27 Đường Số 26, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
        lng: 106.6793068088615,
        lat: 10.7427179839431,
        name: 'Cửa hàng số 2',
        image: 'https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Stfi_LouisVuitton_SAKS_AmericanDream_1_DI3.jpg?wid=490',
        addess: '27 Đường Số 26, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
    },

    {
        lng: 106.38474603925185,
        lat: 11.19665933234468,
        name: 'Cửa hàng số 3',
        image: 'https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Stfi_LouisVuitton_SAKS_AmericanDream_1_DI3.jpg?wid=490',
        addess: '27 Đường Số 26, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
        lng: 106.62570258819406,
        lat: 10.821998003869629,
        name: 'Cửa hàng số 4',
        image: 'https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Stfi_LouisVuitton_SAKS_AmericanDream_1_DI3.jpg?wid=490',
        addess: '27 Đường Số 26, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
    },
];

const Page = () => {
    const ref = useRef(null);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [products, setProducts] = useState<ProductData[]>([]);

    const routes = useRouter();

    const onScreen = useOnScreen(ref);

    useEffectOneCall(() => {
        (async () => {
            const response = await getCategories({ page: 0, limit: 6 });
            setCategories(response.content);
        })();
        (async () => {
            const response = await getProducts({ page: 0, limit: 18 });
            setProducts(response?.data?.products);
        })();
    });

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
        e.preventDefault();
        routes.push(`/products/${id}`);
    };

    return (
        <div className="relative">
            <BannerSlide />
            <div className="my-16" data-scroll-section>
                <h2 className="font-bold md:text-6xl max-md:px-6 text-xl text-center tracking-tight mb-2 break-all ">
                    Discover clothing that enhances your lifestyle.
                </h2>
                <article className="text-center font-light max-md:text-xs">
                    Explore a world-class selection of top-quality apparel tailored to your needs and style preferences.
                </article>
            </div>
            <section className="my-10 font-semibold">
                <div className="container mt-12">
                    <h2 className="md:text-4xl text-xl text-left tracking-tighterbreak-all">Preferred category</h2>
                    <div className="border-t-4 w-1/6 mt-2 border-black mb-10"></div>
                    <div>
                        <BannerCategory data={categories} />
                    </div>
                </div>
                <div className="container mt-12">
                    <h2 className="md:text-4xl text-xl text-left tracking-tighter break-all">Product you may like</h2>
                    <div className="border-t-4 w-1/6 mt-2 border-black mb-10"></div>
                    <div className="grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
                        {products?.map((product) => (
                            <CardProduct key={product.id} product={product} handleClick={handleClick} />
                        ))}
                    </div>
                    <div className="flex items-center justify-center mt-10 ">
                        <Button className="text-base" variant="link" size="lg">
                            <Link href="products" className="flex gap-2 items-center underline">
                                View all product <ArrowRight size={18} className="animate-pulse" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            <div className="container mt-12" id="map">
                <h1 className="md:text-4xl text-xl font-bold ">List store location</h1>
                <div className="border-t-4 w-1/6 mt-2 border-black mb-10"></div>

                <section className="flex">
                    <div className="flex-1">
                        <ul className="flex flex-col gap-4">
                            {listStoreLocation?.map((item: LocationStoreData) => (
                                <li key={item.lat}>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className='className="font-semibold text-sm'>{item.addess}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-[800px] h-[600px] rounded-lg overflow-hidden shadow-md">
                        <StoreLocation listStore={listStoreLocation} />
                    </div>
                </section>
            </div>
        </div>
    );
};
export default Page;
