'use client';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/hooks/use-auth-store';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const OrderSuccessPage = () => {
    return (
        <div className="w-screen h-[70vh] flex items-center justify-center">
            <section className="flex gap-4 flex-col items-center md:w-[30%] md:h-[50%] border-zinc-300 shadow-md rounded-md border-[1px]">
                <div className="p-4 rounded-full border-[1px] border-zinc-200 shadow-sm bg-white -translate-y-[50%]">
                    <ShoppingBasket fill="#f8a23b" size={40} />
                </div>
                <div className="flex flex-col px-10 pb-10 flex-1 justify-between ">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold text-center">Thanks for your order!</h2>
                        <p className="text-center text-sm text-zinc-500">
                            Thank for placing order <br /> We will send your a notification within 2 days when it ships.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-center text-sm">
                            Get in touch with us if you have any <br /> questions or concerns.
                        </p>
                        <div className="flex justify-around">
                            <Button variant="outline">
                                <Link href="/">Go back to shopping</Link>
                            </Button>
                            <Button variant="primary">
                                <Link href={`/order/check-order`}>Track order</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderSuccessPage;
