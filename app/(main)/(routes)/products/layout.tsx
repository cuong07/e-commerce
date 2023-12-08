"use client";
import { SidebarFilter } from "@/components/sidebar/sidebar-filter";
import { usePathname } from "next/navigation";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  const isProductDetailPage = pathName.includes("/products/");

  if (isProductDetailPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="h-full flex gap-4 lg:px-[160px] md:px-[80px]">
      <div className="xl:w-[300px] md:w-[180px] h-full lg:block hidden ">
        <SidebarFilter />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default ProductLayout;
