'use client';
import { ShoppingCart, User } from 'lucide-react';
import { InputSearch } from '../input/input-search';
import React, { useState } from 'react';
import { ModeToggle } from '../mode-toggle';
import useProductStore from '@/hooks/use-product-store';
import { useRouter } from 'next/navigation';
import { CartSheet } from '@/components/cart/cart-sheet';
import { MenuUser } from '../menu/menu-user';
import { Button } from '../ui/button';
import useAuthStore from '@/hooks/use-auth-store';

export const HeaderSearch = () => {
    const { getKeyword } = useProductStore();
    const { currentUser } = useAuthStore();
    const router = useRouter();

    const handleSearch = (keyword: string) => {
        getKeyword(keyword);
        console.log(keyword);
        router.push(`/products/search?name=${keyword}`);
    };

    const handleClickCart = () => {
        router.push('/carts');
    };

    return (
        <div
            className="w-full flex md:px-40 p-6 md:py-6 py-4 dark:border-[#ffffff25] border-[#00000030] 
    border-b-[0.5px] justify-around fixed z-50 bg-white dark:bg-black items-center top-0"
        >
            <div className="md:mr-12 md:flex-1  md:pl-4 flex items-center justify-start">Logo</div>
            <div className="flex-1 flex justify-cente items-centerr">
                <InputSearch handleSearch={handleSearch} />
            </div>
            <div className=" md:flex-1 flex gap-6 items-center md:ml-12 justify-end">
                <div
                    className="cursor-pointer md:flex md:relative transition-all gap-1 items-center 
        font-medium fixed max-md:bottom-2 max-md:border-[1px]  max-md:rounded-full"
                >
                    <CartSheet />
                </div>
                <div className="flex gap-2 items-center font-medium">
                    <User size={20} className="max-md:hidden" />
                    <MenuUser>
                        <div>
                            <ModeToggle />
                            <div className="flex ">
                                <Button
                                    className="bg-transparent border-0 focus:border-none"
                                    variant="outline"
                                    size="icon"
                                >
                                    <User className="h-[1.2rem] w-[1.2rem] " />
                                </Button>
                                <span className="my-auto">Profile</span>
                            </div>
                        </div>
                    </MenuUser>
                </div>
                <div className="max-md:hidden">
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};
