"use client";
import { SidebarFilter } from "@/components/sidebar/sidebar-filter";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import useProductStore from "@/hooks/use-product-store";
import { getProducts } from "@/lib/api/products";
import React, { useEffect } from "react";

const Page = () => {
  const { getListProduct, pagination, nextPage, productsData, totalPage } =
    useProductStore();
  const { onOpen } = useModalStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { page, limit } = pagination;
        const response = await getProducts(page, limit);
        getListProduct(response?.data);
      } catch (error: any) {
        console.log("Error fetching products:", error.response);
        onOpen("error", {
          message: error.response.data,
          code: error.response.status,
        });
      }
    };
    fetchData();
  }, [pagination]);
  console.log("totalPage:" + totalPage);

  const handleNextPage = (page: number) => {
    nextPage(page);
  };

  return (
    <div className="md:px-[160px] flex gap-4">
      <div className="md:w-[300px] h-full border-2">
        <SidebarFilter />
      </div>
      <Button variant="primary" onClick={() => handleNextPage(1)}>
        Next page
      </Button>
    </div>
  );
};

export default Page;
