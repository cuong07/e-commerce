"use client";
import BannerSlide from "@/components/banner/banner-slide";
import CursorProvider from "@/components/providers/cursor-provider";
import useAuthStore from "@/hooks/use-auth-store";
import useCartStore from "@/hooks/use-cart-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { getCurrentCartByUser } from "@/lib/api/cart";
import React, { useEffect } from "react";

const Page = () => {
  const { getCart, setFetching } = useCartStore();
  const { onOpen } = useModalStore();
  useEffect(() => {
    (async () => {
      try {
        setFetching(true);
        const response = await getCurrentCartByUser();
        getCart(response);
      } catch (error: any) {
        setFetching(false);
        if (error.response) {
          onOpen("error", {
            message: error.response.data,
            code: error.response.status,
          });
        } else {
          onOpen("error", {
            message: error.message,
            code: error.code,
          });
        }
      }
    })();
  }, []);
  return (
    <div className="relative ">
      <section>
        <BannerSlide />
      </section>
      <div className="my-16">
        <h2 className="font-bold md:text-5xl text-xl text-center tracking-tight mb-2 break-all ">
          Discover clothing that enhances your lifestyle.
        </h2>
        <article className="text-center font-light">
          Explore a world-class selection of top-quality apparel tailored to
          your needs and style preferences.
        </article>
      </div>
      <section className="my-10 border-b-black border-b font-semibold">
        <h2 className="md:text-4xl text-xl text-center tracking-tighter mg-2 break-all">
          Preferred category
        </h2>
        <div></div>
      </section>
      <CursorProvider />
    </div>
  );
};
export default Page;
