'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { getAllOrders } from '@/lib/api/order';
import { OrderData, OrderDetailData, OrderStatus } from '@/type';
import { useEffectOneCall } from '@/hooks/use-effect-one-call';
import useContextStore from '@/hooks/use-context-store';
import { formatCurency } from '@/lib/utils';
import { container, item } from '@/animate/variants/list-variant';
import Loading from './loading';
import { StatusOrder } from '@/components/status/status-order';

const OrderPage = () => {
    const { contextImgageUrl } = useContextStore();
    const [orders, setOrders] = useState<OrderData[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffectOneCall(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await getAllOrders();
                setOrders(response);
                setIsLoading(false);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    });

    return (
        <div className="container">
            <h1 className=" font-bold text-3xl mb-8">Order history</h1>
            <ul className="flex flex-col gap-8">
                {orders?.map((order: OrderData) => (
                    <li key={order.id} className="shadow-md flex flex-col gap-6 rounded-md p-4">
                        <div className="grid grid-cols-2">
                            <div className="flex gap-2">
                                <div className="font-semibold">Order by:</div>
                                <h2>{order.fullName}</h2>
                            </div>
                            <div className="flex gap-2">
                                <div className="font-semibold">Order date:</div>
                                <h2>{order.orderDate}</h2>
                            </div>
                            <div className="flex gap-2">
                                <div className="font-semibold">Address:</div>
                                <p>{`${order.userAddress.addressOne}, ${order.userAddress.province}, ${order.userAddress.country}, ${order.userAddress.city}`}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="font-semibold">Payment:</div>
                                <h2>{order.paymentMethod}</h2>
                            </div>
                            <div className="flex gap-2">
                                <div className="font-semibold">Status:</div>
                                <StatusOrder status={order.status} />
                            </div>
                        </div>
                        <ul className="flex flex-col gap-4 border-b-[1px] py-4">
                            {order?.orderDetails?.map((item: OrderDetailData) => (
                                <li key={item.id} className="flex gap-4">
                                    <div className="rounded-md overflow-hidden ">
                                        <Image
                                            width={60}
                                            height={60}
                                            src={contextImgageUrl + item.product.thumbnail}
                                            alt={item.product.name}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <h1 className=" font-medium ">{item.product.name}</h1>
                                        <div className="flex justify-between ">
                                            <div>
                                                <article className="text-sm text-zinc-500">
                                                    {item.product.description}
                                                </article>
                                                <div className="font-bold text-sm">x{item.numberOfProducts}</div>
                                            </div>
                                            <div className="">
                                                {formatCurency(item.product.price * item.numberOfProducts)}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex text-lg font-bold justify-end gap-2">
                            <div>Total: </div>
                            <h2>{formatCurency(order.totalMoney)}</h2>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderPage;
