import { SidebarFilter } from "@/components/sidebar/sidebar-filter";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex gap-4 md:px-[160px]">
      <div className="md:w-[300px] h-full lg:block hidden ">
        <SidebarFilter />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default ProductLayout;
