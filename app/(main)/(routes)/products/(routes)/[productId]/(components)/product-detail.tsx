"use client";
import { ProductData, ProductImage } from "@/type";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import notFound from "@/assets/notfound.jpg";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { useModalStore } from "@/hooks/use-modal-store";
export const ProductDetail = ({ product }: { product: ProductData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { onClose, onOpen } = useModalStore();

  const handleOpenImageModal = () => {
    onOpen("image", { productImage: product.product_images });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4 md:w-[36vw]">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full"
        >
          {product.product_images.length > 0 &&
            product.product_images.map((image: ProductImage) => (
              <SwiperSlide key={image.id} onClick={handleOpenImageModal}>
                <img
                  src={image.image_url}
                  alt={product.name}
                  className="object-cover w-full"
                />
              </SwiperSlide>
            ))}
          {product.product_images.length === 0 && (
            <SwiperSlide>
              <Image
                src={notFound}
                alt="not found"
                className="object-cover w-full"
              />
            </SwiperSlide>
          )}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full"
        >
          {product.product_images.length > 0 &&
            product.product_images.map((image: ProductImage) => (
              <SwiperSlide key={image.id}>
                <img
                  src={image.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </SwiperSlide>
            ))}
          {product.product_images.length === 0 &&
            new Array(4).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={notFound}
                  alt="not found"
                  className="object-cover w-full"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
