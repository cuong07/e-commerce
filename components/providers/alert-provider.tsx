'use client';

import { useEffect, useState } from 'react';
import { AlertLogin } from '@/components/alert/alert-login';

export const AlertProvider = () => {
    const [isMounted, setItMounted] = useState(false);

    useEffect(() => {
        setItMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <AlertLogin />
        </>
    );
};
