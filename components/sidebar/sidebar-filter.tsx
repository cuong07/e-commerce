import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SidebarItem } from './sidebar-item';
import { CategoryData } from '@/type';
import { categoryV1 } from '@/constant/endpoint';
import qs from 'query-string';
import { request } from '@/lib/axios';
import { useEffectOneCall } from '@/hooks/useEffectOneCall';

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
        return response.data as CategoryData[];
    } catch (error: any) {
        console.log('GET_CATEGORY_ERROR: ', error);
        throw error;
    }
}

export const SidebarFilter = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);

    useEffectOneCall(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories({ page: 0, limit: 10 });
                setCategories(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    });

    return (
        <div>
            <h2 className="font-semibold text-xl px-2">Fillter</h2>
            <div>
                {DUMMY_DATA.map((data, index) => (
                    <SidebarItem item={data} categories={categories} key={index} />
                ))}
            </div>
        </div>
    );
};
