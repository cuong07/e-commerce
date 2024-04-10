'use client';
import React, { useState } from 'react';
import { getAllOrders } from '@/lib/api/order';
import { OrderData, OrderDetailData } from '@/type';
import { useEffectOneCall } from '@/hooks/use-effect-one-call';
import useContextStore from '@/hooks/use-context-store';
import Image from 'next/image';
import { formatCurency } from '@/lib/utils';
import moment from 'moment';

const OrderPage = () => {
    const { contextImgageUrl } = useContextStore();
    const [orders, setOrders] = useState<OrderData[]>();
    useEffectOneCall(() => {
        (async () => {
            try {
                const response = await getAllOrders();
                setOrders(response);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    });
    console.log(orders);

    return (
        <div className="container">
            <h1 className="text-center text-xl  uppercase mb-8">Order history</h1>
            <div className="flex flex-col gap-8">
                {orders?.map((order: OrderData) => (
                    <div key={order.id} className="shadow-md flex flex-col gap-6 rounded-md p-4">
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
                                <h2>{order.status}</h2>
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
                                                <div className="font-medium text-sm">x{item.numberOfProducts}</div>
                                            </div>
                                            <div>{formatCurency(item.product.price * item.numberOfProducts)}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>{' '}
                        <div className="flex text-lg font-bold justify-end gap-2">
                            <div>Total: </div>
                            <h2>{formatCurency(order.totalMoney)}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;
