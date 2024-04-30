'use client';
import { StatusOrder } from '@/components/status/status-order';
import { Button } from '@/components/ui/button';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useModalStore } from '@/hooks/use-modal-store';
import { getOrders, updateOrderStatus } from '@/lib/api/order';
import { formatCurency } from '@/lib/utils';
import { OrderData, OrderStatus } from '@/type';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const status: OrderStatus[] = [
    OrderStatus.PENDING,
    OrderStatus.PROCESSING,
    OrderStatus.SHOPPED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
];

const OrderPage = () => {
    const [statusActive, setStatusActive] = useState<OrderStatus>(OrderStatus.PENDING);
    const [orders, setOrders] = useState<OrderData[]>([]);
    const { onOpen } = useModalStore();

    const handleChangeStatus = (status: OrderStatus) => {
        setStatusActive(status);
    };

    const handleUpdateStatus = async (id: number, status: OrderStatus) => {
        const res = await updateOrderStatus(id, status);
        setStatusActive(status);
        console.log(res);
    };

    const handleOpenModal = (order: OrderData) => {
        onOpen('order-detail', { order });
    };

    useEffect(() => {
        (async () => {
            const response = await getOrders({ page: 0, limit: 10, status: statusActive });
            setOrders(response);
        })();
    }, [statusActive]);

    return (
        <div className="container">
            <Menubar className="w-fit" defaultValue={statusActive}>
                {status.map((item) => (
                    <MenubarMenu key={item} value={item}>
                        <MenubarTrigger onClick={() => handleChangeStatus(item)} className="cursor-pointer">
                            {item}
                        </MenubarTrigger>
                    </MenubarMenu>
                ))}
            </Menubar>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>More</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>
                                    <div className="w-fit">
                                        <StatusOrder status={item.status} />
                                    </div>
                                </TableCell>
                                <TableCell>{moment(item.orderDate).format('LL')}</TableCell>
                                <TableCell>{formatCurency(item.totalMoney)}</TableCell>
                                <TableCell className="w-[160px]">
                                    <Select onValueChange={(value: OrderStatus) => handleUpdateStatus(item.id, value)}>
                                        <SelectTrigger id="subcategory" aria-label={item.status}>
                                            <SelectValue placeholder={item.status} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {status.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button variant="link" onClick={() => handleOpenModal(item)}>
                                        Show detail
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrderPage;
