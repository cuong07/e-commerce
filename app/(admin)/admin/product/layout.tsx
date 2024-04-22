import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const ProductAdminLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-[200px] flex-1 overflow-hidden py-8 bg-zinc-200">{children}</div>;
};

export default ProductAdminLayout;
