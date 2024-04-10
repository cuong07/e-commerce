import { AdminSidebar } from '@/utils/admin-sidebar';
import React from 'react';
import { SidebarItem } from './sidebar-item';
import Image from 'next/image';
import logo from '@/public/logo.png';

export const SidebarMenu = () => {
    return (
        <div className=" flex flex-col h-full">
            <div className="h-[80px] flex gap-2 items-center justify-center">
                {/* <Image src={logo} alt="logo" className="w-14 h-14" /> */}
                <h1 className="font-semibold text-3xl tracking-tighter uppercase">psono</h1>
            </div>
            <div className="flex-1 py-8 px-4 flex flex-col justify-between">
                <ul>
                    {AdminSidebar.map((item: any) => (
                        <SidebarItem link={item.link} icon={item.icon} name={item.name} key={item.name} />
                    ))}
                </ul>
                <div>
                    <div>Setting</div>
                </div>
            </div>
        </div>
    );
};
