import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const ProductAdminLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="container flex-1 overflow-hidden py-8 ">{children}</div>;
};

export default ProductAdminLayout;
