import { Header } from '@/components/admin/header/header';
import { SidebarMenu } from '@/components/admin/sidebar/sidebar-menu';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div className="w-[260px] border h-screen">
                <SidebarMenu />
            </div>
            <div className="flex-1">
                <div className="h-[80px] border ">
                    <Header />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
