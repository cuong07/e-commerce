"use client";
import React, { useEffect, useState } from "react";
import useProductStore from "@/hooks/use-product-store";
import Skeleton from "./(components)/skeleton";
import { CardProduct } from "@/components/card/card-product";
import { ProductData } from "@/type";
import { getProducts } from "@/lib/api/products";
import { useModalStore } from "@/hooks/use-modal-store";
import { LoadMore } from "@/components/load-more";
import ScrollTop from "@/components/scroll-top";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const {
    pagination,
    productsData,
    totalPage,
    isLoading,
    keyword,
    getListProductsSearch,
    nextPage,
    setFetching,
    getListProduct,
  } = useProductStore();
  const { onOpen } = useModalStore();

  useEffect(() => {
    (async () => {
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
    })();
  }, [pagination]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getProducts({ page: 0, limit: 20, keyword });
        getListProductsSearch(response?.data);
        setFetching(false);
      } catch (error: any) {
        setFetching(false);
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
    })();
  }, [keyword]);

  const handleClickCard = (id: number) => {
    router.push("/products/" + id);
  };

  return (
    <div className=" gap-4 container mx-auto">
      {isLoading && <Skeleton numberElement={12} />}
      {!isLoading && (
        <div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {productsData?.map((product: ProductData, index: number) => (
              <div onClick={() => handleClickCard(product.id)} key={index}>
                <CardProduct product={product} key={index} />
              </div>
            ))}
          </div>
          {totalPage > 1 && (
            <>
              <LoadMore
                loadMore={nextPage}
                skeleton={<Skeleton numberElement={8} />}
              />
              <ScrollTop />
            </>
          )}
          {totalPage === 0 && (
            <h1 className="text-center text-3xl">Not found products</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
