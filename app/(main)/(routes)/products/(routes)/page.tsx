"use client";
import { CardProduct } from "@/components/card/card-product";
import { SidebarFilter } from "@/components/sidebar/sidebar-filter";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import useProductStore from "@/hooks/use-product-store";
import { getProducts } from "@/lib/api/products";
import { ProductData } from "@/type";
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
  const handleNextPage = (page: number) => {
    nextPage(page);
  };

  return (
    <div className=" flex flex-col gap-4">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {productsData?.map((product: ProductData, index: number) => (
          <CardProduct product={product} key={index} />
        ))}
      </div>
      <Button variant="primary" onClick={() => handleNextPage(1)}>
        Next page
      </Button>
    </div>
  );
};

export default Page;
