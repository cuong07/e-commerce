'use client';
import useProductStore from '@/hooks/use-product-store';
import { CategoryData } from '@/type';
import Link from 'next/link';
import React from 'react';

interface BannerCategoryProps {
    data: CategoryData[];
}

export const BannerCategory: React.FC<BannerCategoryProps> = ({ data }) => {
    const { getCategoryId } = useProductStore();
    const handleGetCategoryId = (id: string) => {
        getCategoryId(parseInt(id));
    };
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 container gap-x-4 gap-y-4 xl:grid-cols-6">
            {data.map((category) => (
                <Link
                    href={`/products/search?category=${category.name}`}
                    key={category.id}
                    onClick={() => handleGetCategoryId(category.id)}
                    className="h-24 rounded-lg flex items-center justify-center border-[1px] shadow-md"
                >
                    <h2 className="text-lg ">{category.name}</h2>
                </Link>
            ))}
        </div>
    );
};
// background-image: linear-gradient( 109.6deg,  rgba(15,2,2,1) 11.2%, rgba(36,163,190,1) 91.1% );
