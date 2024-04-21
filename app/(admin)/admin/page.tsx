import { SalesSummary } from '@/components/admin/summary/sales-summary';
import React from 'react';

const page = () => {
    return (
        <div className="p-6">
            <div className="grid-cols-4 grid gap-8">
                <SalesSummary title="Total Revenue" total={45231.89} percent={20.1} />
                <SalesSummary title="Total Revenue" total={45231.89} percent={20.1} />
                <SalesSummary title="Total Revenue" total={45231.89} percent={20.1} />
                <SalesSummary title="Total Revenue" total={45231.89} percent={20.1} />
            </div>
        </div>
    );
};

export default page;
