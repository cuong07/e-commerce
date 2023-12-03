"use client";
import { ShoppingCart, User } from "lucide-react";
import { InputSearch } from "../input/input-search";
import React, { useState } from "react";
import { ModeToggle } from "../mode-toggle";

export const HeaderSearch = () => {
  const handleSubmit = (value: string) => {
    console.log(value);
  };
  return (
    <div className="w-full flex md:px-40 p-6 md:py-6 py-4 dark:border-[#ffffff25] border-[#00000030] border-b-[0.5px] justify-around">
      <div className="mr-12 pl-4 flex items-center justify-start">Logo</div>
      <div className="flex-1">
        <InputSearch handleSubmit={handleSubmit} />
      </div>
      <div className="flex gap-6 items-center ml-12">
        <ShoppingCart size={18} className="text-zinc-600" />
        <User size={18} className="text-zinc-600" />
        <ModeToggle />
      </div>
    </div>
  );
};
