'use client';
import { OrderStatus } from '@/type';
import { BookX, Check, Clock1, Hourglass, Package, WatchIcon } from 'lucide-react';
import React from 'react';

export const StatusOrder = ({ status }: { status: OrderStatus }) => {
    switch (status) {
        case OrderStatus.PENDING:
            return (
                <div className="px-2 py-1 rounded-md text-zinc-700 font-semibold text-xs flex gap-2 items-center bg-[#FFD700]">
                    PENNDING <Clock1 size={16} />
                </div>
            );
            break;
        case OrderStatus.PROCESSING:
            return (
                <div className="px-2 py-1 rounded-md text-zinc-700 font-semibold text-xs flex gap-2 items-center bg-[#00FF00]">
                    PROCESSING <Hourglass size={16} />
                </div>
            );
            break;
        case OrderStatus.SHOPPED:
            return (
                <div className="px-2 py-1 rounded-md text-zinc-700 font-semibold text-xs flex gap-2 items-center bg-[#FFA500]">
                    SHOPPED <Check size={16} />
                </div>
            );
            break;
        case OrderStatus.DELIVERED:
            return (
                <div className="px-2 py-1 rounded-md text-zinc-700 font-semibold text-xs flex gap-2 items-center bg-[#7CFC00]">
                    DELIVERED <Package size={16} />
                </div>
            );
            break;
        case OrderStatus.CANCELLED:
            return (
                <div className="px-2 py-1 rounded-md text-zinc-700 font-semibold text-xs flex gap-2 items-center bg-[#FF0000]">
                    CANCELLED <BookX size={16} />
                </div>
            );
            break;
        default:
            break;
    }
};
