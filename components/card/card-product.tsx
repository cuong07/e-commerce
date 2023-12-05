import { ProductData } from "@/type";
import Image from "next/image";
import React, { Suspense } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const CardProduct = ({ product }: { product: ProductData }) => {
  const noImage = "http://sacus.vn/wp-content/uploads/2019/06/no-image.jpg";

  return (
    <Card className="flex flex-col h-[320px] rounded-md overflow-hidden cursor-pointer">
      <CardContent className="p-0 h-[70%] overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={product.thumbnail ? product.url : noImage}
            alt={product.name}
            layout="fill" // Fill the container
            objectFit="cover" // Maintain aspect ratio and cover container
            className="object-cover hover:scale-110 scale-105 transition-all"
          />
        </div>
      </CardContent>
      <CardFooter className="p-1">
        <h2 className="font-medium text-base">{product.name}</h2>
      </CardFooter>
    </Card>
  );
};
