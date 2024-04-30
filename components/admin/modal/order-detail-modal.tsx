'use client';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/use-modal-store';
import { OrderData } from '@/type';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const OrderDetailModal = () => {
    const { isOpen, data, onClose, type } = useModalStore();
    const { order } = data;
    const isModalOpen = isOpen && type === 'order-detail';
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black  overflow-hidden">
                <DialogHeader className="pt-8 px-6 flex flex-col items-center">
                    <DialogDescription className="">{order?.fullName}</DialogDescription>
                    <DialogDescription className="">{order?.fullName}</DialogDescription>
                    <DialogDescription className="">{order?.fullName}</DialogDescription>
                    <DialogDescription className="">{order?.fullName}</DialogDescription>
                    <DialogDescription className="">{order?.fullName}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 p-2">
                    <div className="flex items-center justify-end w-full">
                        <Button onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
