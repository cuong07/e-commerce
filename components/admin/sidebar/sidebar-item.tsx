import Link from 'next/link';
import React from 'react';

interface SidebarItemProps {
    name: string;
    link: string;
    icon: React.ReactNode;
}

export const SidebarItem = ({ icon, link, name }: SidebarItemProps) => {
    return (
        <li className="py-3 px-4 hover:bg-black transition hover:text-white font-medium text-zinc-600">
            <Link href={`/admin/${link}`} className="flex gap-2 items-center">
                <span>{icon}</span>
                <span>{name}</span>
            </Link>
        </li>
    );
};
