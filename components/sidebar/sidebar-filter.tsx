import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SidebarItem } from './sidebar-item';
import { CategoryData } from '@/type';
import { categoryV1 } from '@/constant/endpoint';
import qs from 'query-string';
import { request } from '@/lib/axios';
import { Slider } from '../ui/slider';
import { formatCurency } from '@/lib/utils';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import useProductStore from '@/hooks/use-product-store';
import { useEffectOneCall } from '@/hooks/use-effect-one-call';

const DUMMY_DATA = [
    {
        name: 'Category',
        type: 'radio',
        data: [
            {
                name: 'Ao Quan',
                id: 1,
            },
            {
                name: 'Thiet Bi dien tu',
                id: 2,
            },
            {
                name: 'Do gia dung',
                id: 3,
            },
            {
                name: 'Cuong',
                id: 4,
            },
        ],
    },
    {
        name: 'Color',
        type: 'nomal',
        data: [
            {
                name: 'Red',
                value: '#ff0808',
                id: 1,
            },
            {
                name: 'Blue ',
                value: '#4a08ff',
                id: 2,
            },
            {
                name: 'Green',
                value: '#08ff29',
                id: 3,
            },
            {
                name: 'Pink',
                value: '#ff08ad',
                id: 3,
            },
            {
                name: 'Black',
                value: '#000000',
                id: 3,
            },
        ],
    },
    {
        name: 'Size',
        type: 'nomal',
        data: [
            {
                name: 'M',
                value: '',
                id: 1,
            },
            {
                name: 'XL',
                value: '',
                id: 2,
            },
            {
                name: 'S',
                value: '',
                id: 3,
            },
        ],
    },
];
interface QueryString {
    page?: number;
    limit?: number;
}

async function getCategories({ page, limit }: QueryString) {
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
}

const MIN_PRICE = 0;
const MAX_PRICE = 999;

export const SidebarFilter = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const { getPrice, keyword, price, getCategoryId } = useProductStore();
    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
    const [categoryId, setCategoryId] = useState<number>(0);
    const router = useRouter();

    const [min] = useDebounce(minPrice, 1000);
    const [max] = useDebounce(maxPrice, 1000);

    useEffect(() => {
        const shouldFetchData = minPrice !== 0 || maxPrice !== 200 || categoryId !== 0;

        if (shouldFetchData) {
            // Assuming these are asynchronous functions
            getPrice({ minPrice, maxPrice });
            getCategoryId(categoryId);

            (async () => {
                const baseSearchParams = `min_pice=${minPrice}&max_pice=${maxPrice}`;
                if (keyword.length > 0) {
                    const keywordParam = `&keyword=${keyword}`;
                    const categoryParam = categoryId !== 0 ? `&category_id=${categoryId}` : '';
                    router.push(`/products/search?${baseSearchParams}${keywordParam}${categoryParam}`);
                } else {
                    const categoryParam = categoryId !== 0 ? `&category_id=${categoryId}` : '';
                    router.push(`/products/search?${baseSearchParams}${categoryParam}`);
                }
            })();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, categoryId, keyword]);

    useEffectOneCall(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories({ page: 0, limit: 10 });
                setCategories(response.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    });

    const handleChangePrice = (value: number[]) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    };

    const handleChangeCategory = (value: string) => {
        setCategoryId(parseInt(value));
    };

    return (
        <div>
            <h2 className="font-semibold text-xl px-2">Fillter</h2>
            <div>
                <Accordion type="multiple" autoFocus className="w-full p-2">
                    <AccordionItem value="number" className="">
                        <AccordionTrigger className="hover:no-underline py-2">Price</AccordionTrigger>
                        <AccordionContent>
                            <div className="my-6 flex flex-col gap-2">
                                <div className="flex justify-between text-base font-semibold">
                                    <span>{formatCurency(minPrice)}</span>
                                    <span>{formatCurency(maxPrice)}</span>
                                </div>
                                <Slider
                                    defaultValue={[10, 20]}
                                    value={[minPrice, maxPrice]}
                                    step={1}
                                    min={0}
                                    max={MAX_PRICE}
                                    onValueChange={handleChangePrice}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {DUMMY_DATA.map((data, index) => (
                    <SidebarItem handleChange={handleChangeCategory} item={data} categories={categories} key={index} />
                ))}
            </div>
        </div>
    );
};
