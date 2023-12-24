'use client';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreProps {
    loadMore: (count: number) => void;
    skeleton: React.ReactNode;
}

export const LoadMore = ({ loadMore, skeleton }: LoadMoreProps) => {
    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView) {
            loadMore(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <div ref={ref} className="mt-8">
            {skeleton}
        </div>
    );
};
