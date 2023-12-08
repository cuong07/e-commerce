"use client";
import { ShoppingCart, User } from "lucide-react";
import { InputSearch } from "../input/input-search";
import React, { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import useProductStore from "@/hooks/use-product-store";
import { useRouter } from "next/navigation";

export const HeaderSearch = () => {
  const { getKeyword } = useProductStore();
  const router = useRouter();

  const handleSearch = (keyword: string) => {
    getKeyword(keyword);
    console.log(keyword);
    router.push("/products");
  };

  return (
    <div className="w-full flex md:px-40 p-6 md:py-6 py-4 dark:border-[#ffffff25] border-[#00000030] border-b-[0.5px] justify-around">
      <div className="mr-12 flex-1  pl-4 flex items-center justify-start">
        Logo
      </div>
      <div className="flex-1 flex justify-center">
        <InputSearch handleSearch={handleSearch} />
      </div>
      <div className=" flex-1 flex gap-6 items-center ml-12 justify-end">
        <ShoppingCart size={18} className="text-zinc-600" />
        <User size={18} className="text-zinc-600" />
        <ModeToggle />
      </div>
    </div>
  );
};
