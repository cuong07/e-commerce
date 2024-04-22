import { Header } from '@/components/admin/header/header';
import { SidebarMenu } from '@/components/admin/sidebar/sidebar-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-[260px] border">
                <SidebarMenu />
            </div>
            <div className="flex-1 ">
                <div className="h-[80px] border ">
                    <Header />
                </div>
                <div className="pb-20 h-full">
                    <ScrollArea className="h-full overflow-hidden ">{children}</ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
