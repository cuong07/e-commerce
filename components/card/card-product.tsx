import { ProductData } from "@/type";
import React from "react";

export const CardProduct = ({ product }: { product: ProductData }) => {
  return (
    <div className="md:w-1/3 xl:w-1/4  w-1/2 my-1 lg:my-4  lg:px-4 md:h-[300px] h-[200px] border">
      {product.name}
    </div>
  );
};
