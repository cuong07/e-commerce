"use client";
import { ShoppingCart, User } from "lucide-react";
import { InputSearch } from "../input/input-search";
import React, { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import useProductStore from "@/hooks/use-product-store";
import { useRouter } from "next/navigation";
import { CartSheet } from "@/components/cart/cart-sheet";

export const HeaderSearch = () => {
  const { getKeyword } = useProductStore();
  const router = useRouter();

  const handleSearch = (keyword: string) => {
    getKeyword(keyword);
    console.log(keyword);
    router.push("/products");
  };

  const handleClickCart = () => {
    router.push("/carts");
  };

  return (
    <div
      className="w-full flex md:px-40 p-6 md:py-6 py-4 dark:border-[#ffffff25] border-[#00000030] 
    border-b-[0.5px] justify-around fixed z-50 bg-white dark:bg-black items-center top-0"
    >
      <div className="mr-12 flex-1  pl-4 flex items-center justify-start">
        Logo
      </div>
      <div className="flex-1 flex justify-cente items-centerr">
        <InputSearch handleSearch={handleSearch} />
      </div>
      <div className=" flex-1 flex gap-6 items-center ml-12 justify-end">
        <div className="cursor-pointer flex gap-1 items-center font-medium">
          <CartSheet />
        </div>
        <div className="flex gap-2 items-center font-medium">
          <User size={20} />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
