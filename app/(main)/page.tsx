'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitText from '@/utils/Split3.min';
import BannerSlide from '@/components/banner/banner-slide';
import useOnScreen from '@/hooks/use-on-screen';
import { BannerCategory } from '@/components/banner/banner-category';
import { getCategories } from '@/lib/api/category';
import { useEffectOneCall } from '@/hooks/use-effect-one-call';
import { CategoryData } from '@/type';

const Page = () => {
    const ref = useRef(null);
    const [reveal, setReveal] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryData[]>([]);

    const onScreen = useOnScreen(ref);

    useEffectOneCall(() => {
        (async () => {
            const response = await getCategories({ page: 0, limit: 6 });
            setCategories(response.content);
        })();
    });

    useEffect(() => {
        if (onScreen) setReveal(onScreen);
    }, [onScreen]);

    useEffect(() => {
        if (reveal) {
            const split = new SplitText('#headline', { type: 'lines' });
            gsap.to(split.lines, {
                duration: 1,
                y: -10,
                opacity: 1,
                stagger: 0.6,
                ease: 'power4.inOut',
                // onComplete: () => split.revert(),
                animationDelay: 2,
            });
        }
    }, [reveal]);

    return (
        <div className="relative ">
            <BannerSlide />
            <div className="my-16" data-scroll-section>
                <h2
                    ref={ref}
                    id="headline"
                    className="font-bold md:text-4xl max-md:px-6 text-xl text-center tracking-tight mb-2 break-all "
                >
                    Discover clothing that enhances your lifestyle.
                </h2>
                <article ref={ref} id="headline" className="text-center font-light max-md:text-xs">
                    Explore a world-class selection of top-quality apparel tailored to your needs and style preferences.
                </article>
            </div>
            <section className="my-10 border-b-black border-b font-semibold">
                <h2 className="md:text-4xl text-xl text-center tracking-tighter mg-2 break-all">Preferred category</h2>
                <div>
                    <BannerCategory data={categories} />
                </div>
            </section>
            {/* <CursorProvider /> */}
        </div>
    );
};
export default Page;
