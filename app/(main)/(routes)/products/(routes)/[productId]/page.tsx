import { getDetailProduct } from "@/lib/api/products";
import { request } from "@/lib/axios";
import { ProductData, ProductImage } from "@/type";
import React from "react";
import { ProductDetail } from "./(components)/product-detail";

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

async function getProduct(productId: string) {
  try {
    const response = await getDetailProduct(productId);
    const imageUrl = response.data.product_images.map((img: ProductImage) => ({
      ...img,
      image_url: process.env.NEXT_PUBLIC_BASE_URL + img.image_url,
    }));
    const result = { ...response.data, product_images: imageUrl };
    return result as ProductData;
  } catch (error) {
    console.log("GET_DETAIL_PRODUCT_ERROR: " + error);
  }
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { productId } = params;
  const product = (await getProduct(productId)) as ProductData;

  return (
    <div className="lg:px-[160px]">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
