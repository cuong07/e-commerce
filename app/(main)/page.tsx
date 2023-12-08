"use client";
import BannerSlide from "@/components/banner/banner-slide";
import CursorProvider from "@/components/providers/cursor-provider";
import useAuthStore from "@/hooks/use-auth-store";
import React from "react";

const Page = () => {
  const { loginData } = useAuthStore();
  console.log("Token: ", loginData?.token);

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
