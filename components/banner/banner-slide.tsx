"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { banners, cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TextTyping from "@/components/text/text-typing";
import { useState } from "react";

const BannerSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      onSlideChange={(swiper) => handleSlideChange(swiper)}
      className="md:h-[800px] min-h-[200px] "
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={banner.titile}>
          <div className="relative h-full ">
            <div className="absolute left-0 top-0">
              <Image
                src={banner.image}
                alt={banner.titile}
                className="w-full h-full object-cover "
              />
            </div>

            <div
              className={cn(
                "absolute md:flex h-full w-full  flex-col gap-4 justify-center hidden md:p-8 p-2",
                banner.pos === "end" && "justify-end w-full items-end",
              )}
            >
              {activeIndex === index && (
                <TextTyping
                  className="md:text-3xl font-light text-white"
                  text={banner.titile}
                />
              )}
              {activeIndex !== index && (
                <span className="md:text-4xl font-light text-white">
                  {banner.titile}
                </span>
              )}

              {activeIndex === index && (
                <TextTyping
                  className="md:text-base text-white font-extralight "
                  text={banner.description}
                />
              )}
              {activeIndex !== index && (
                <span className="md:text-base text-white font-extralight ">
                  {banner.description}
                </span>
              )}
              <div className="flex gap-4">
                {banner.action.map((action) => (
                  <Button
                    key={action.title}
                    variant="default"
                    className="transition-all hover:no-underline md:text-base md:p-6 font-thin rounded-none"
                  >
                    <Link href={action.link} className="no-underline">
                      {action.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlide;
