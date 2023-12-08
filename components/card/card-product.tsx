import { ProductData } from "@/type";
import Image from "next/image";
import React, { Suspense } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";

export const CardProduct = ({ product }: { product: ProductData }) => {
  // const noImage = "http://sacus.vn/wp-content/uploads/2019/06/no-image.jpg";

  return (
    <Card className="flex flex-col h-[320px] rounded-md overflow-hidden cursor-pointer">
      <CardContent className="p-0 h-[70%] overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={product.url}
            alt={product.name}
            layout="fill" // Fill the container
            objectFit="cover" // Maintain aspect ratio and cover container
            className="object-cover hover:scale-110 scale-105 transition-all"
          />
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-between flex-1  flex-col items-start">
        <div className="flex flex-col">
          <h2 className="font-medium text-base hover:underline">
            {product.name}
          </h2>
          <p className="text-sm font-extralight">
            {product.description.substring(20)}
          </p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="">${product.price}</p>
          <Button variant="outline">Add to cart</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
