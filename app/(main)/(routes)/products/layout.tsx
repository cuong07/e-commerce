"use client";

import { SidebarFilter } from "@/components/sidebar/sidebar-filter";
import { useModalStore } from "@/hooks/use-modal-store";
import { getCategories } from "@/lib/api/category";
import React, { useEffect } from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  const { onOpen } = useModalStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories({ page: 0, limit: 10 });
      } catch (error: any) {
        console.log("Error fetching category:", error);
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
    };
    fetchData();
  }, []);
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
