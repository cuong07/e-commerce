'use client';
import { ArrowUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setIsVisible(scrolled > 600);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-0 right-0 p-1 cursor-pointer  bg-zinc-700 text-zinc-100 m-2 rounded-full ${
                isVisible ? 'opacity-100 animate-bounce' : 'opacity-0'
            } transition-opacity`}
            onClick={scrollToTop}
        >
            <ArrowUp className="" />
        </div>
    );
};

export default ScrollTop;
