'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/use-modal-store';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import notFound from '@/assets/notfound.jpg';
import { ProductImage } from '@/type';

export const ImageModal = () => {
    const { isOpen, data, onClose, type } = useModalStore();
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const { productImage } = data;

    const isModalOpen = isOpen && type === 'image';
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="md:max-w-[70vw] max-w-[90vw] h-[80vh] bg-transparent shadow-none border-none">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full"
                >
                    {productImage &&
                        productImage?.length > 0 &&
                        productImage.map((image: ProductImage) => (
                            <SwiperSlide key={image.id} className="relative">
                                <Image
                                    src={image.imageUrl}
                                    alt={image.imageUrl}
                                    className="object-cover w-full"
                                    fill
                                    sizes="100vw"
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </DialogContent>
        </Dialog>
    );
};
