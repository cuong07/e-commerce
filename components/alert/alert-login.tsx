'use client';
import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlertStore } from '@/hooks/use-alert-store';
import { AlertCircle, AlertTriangle, MailWarningIcon } from 'lucide-react';
import Link from 'next/link';

export const AlertLogin = () => {
    const { isOpen, data, onClose, type } = useAlertStore();
    const isModalOpen = isOpen && type === 'warning';
    return (
        <AlertDialog open={isModalOpen} onOpenChange={onClose}>
            <AlertDialogContent className="rounded-3xl ">
                <AlertDialogHeader>
                    <div className="flex justify-center">
                        <AlertTriangle size={80} color="#ffcc00" />
                    </div>
                    <AlertDialogTitle>{data.message}</AlertDialogTitle>
                    <AlertDialogDescription>{data.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Link href={data.link ?? ''} onClick={onClose}>
                            Login
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
