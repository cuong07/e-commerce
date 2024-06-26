'use client';
import { SidebarFilter } from '@/components/sidebar/sidebar-filter';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';
import Skeleton from './(components)/skeleton';

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();

    const isProductDetailPage = pathName.includes('/products/');
    const isProductSearchPage = pathName.includes('/products/search');

    if (isProductDetailPage && !isProductSearchPage) {
        return <main>{children}</main>;
    }

    return (
        <div className="h-full flex gap-4 lg:px-[160px] md:px-[80px] relative">
            <div className="xl:w-[300px] md:w-[180px] h-full lg:block hidden  sticky top-[120px]">
                <SidebarFilter />
            </div>
            <main className="flex-1">
                <Suspense fallback={<Skeleton numberElement={12} />}>{children}</Suspense>
            </main>
        </div>
    );
};

export default ProductLayout;
