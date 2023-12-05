"use client";
import React, { ElementRef, Suspense, useEffect, useRef } from "react";
import useProductStore from "@/hooks/use-product-store";
import Skeleton from "./skeleton";
import { CardProduct } from "@/components/card/card-product";
import { ProductData } from "@/type";
import { getProducts } from "@/lib/api/products";
import { useModalStore } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { LoadMore } from "@/components/load-more";

const Page = () => {
  const {
    getListProduct,
    pagination,
    nextPage,
    productsData,
    totalPage,
    setFetching,
    isLoading,
  } = useProductStore();
  const { onOpen } = useModalStore();
  console.log("copmponent");
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch");
      try {
        const { page, limit } = pagination;
        const response = await getProducts({ page, limit });
        getListProduct(response?.data);
        setFetching(false);
      } catch (error: any) {
        setFetching(false);
        console.log("Error fetching products:", error);
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
  }, [pagination]);

  return (
    <div className=" gap-4 container mx-auto">
      {isLoading && <Skeleton numberElement={12} />}
      {!isLoading && (
        <div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {productsData?.map((product: ProductData, index: number) => (
              <CardProduct product={product} key={index} />
            ))}
          </div>
          {totalPage > 1 && (
            <LoadMore
              loadMore={nextPage}
              skeleton={<Skeleton numberElement={8} />}
            />
          )}
          {totalPage === 0 && (
            <h1 className="text-center text-3xl">Not found products</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
