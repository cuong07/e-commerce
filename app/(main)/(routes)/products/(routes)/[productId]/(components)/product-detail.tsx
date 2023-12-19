"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useModalStore } from "@/hooks/use-modal-store";
import Breadcrumbs from "@/components/sreadcrumbs";
import { Button } from "@/components/ui/button";
import { ProductData, ProductImage } from "@/type";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import notFound from "@/assets/notfound.jpg";
import { getProducts } from "@/lib/api/products";
import { CardProduct } from "@/components/card/card-product";
import { useRouter } from "next/navigation";
import { formatCurency } from "@/lib/utils";

export const ProductDetail = ({ product }: { product: ProductData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { onOpen } = useModalStore();
  const router = useRouter();

  const handleOpenImageModal = () => {
    onOpen("image", { productImage: product.product_images });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts({
          limit: 20,
          page: 0,
          category_id: product.category_id,
        });
        const result = response.data.products.map((product: ProductData) => ({
          ...product,
          url: process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail,
        }));
        console.log(result);
        setProducts(result);
      } catch (error: any) {
        console.log("GET_PRODUCT_ERROR", error);
      }
    };
    fetchData();
  }, [product.category_id]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClickCard = (id: number) => {
    router.push("/products/" + id);
  };

  return (
    <div className=" flex flex-col gap-8 container">
      <div className="flex md:gap-8 gap-2 ">
        <section className="flex flex-col gap-4 md:w-[36vw]  md:min-w-[36vw]">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full"
          >
            {product.product_images.length > 0 &&
              product.product_images.map((image: ProductImage) => (
                <SwiperSlide key={image.id} onClick={handleOpenImageModal}>
                  <img
                    src={image.image_url}
                    alt={product.name}
                    className="object-cover w-full"
                  />
                </SwiperSlide>
              ))}
            {product.product_images.length === 0 && (
              <SwiperSlide>
                <Image
                  src={notFound}
                  alt="not found"
                  className="object-cover w-full"
                />
              </SwiperSlide>
            )}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={6}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full"
          >
            {product.product_images.length > 0 &&
              product.product_images.map((image: ProductImage) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={image.image_url}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </SwiperSlide>
              ))}
            {product.product_images.length === 0 &&
              new Array(4).fill(0).map((_, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={notFound}
                    alt="not found"
                    className="object-cover w-full"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
        <section className="flex gap-8 flex-col">
          <Breadcrumbs
            items={[
              { label: "Products", path: "/products" },
              { label: product.name, path: "" },
            ]}
          />
          <h2 className="font-bold text-5xl tracking-tight">{product.name}</h2>

          <div className="">
            <div className=" flex gap-2 items-center mb-2">
              <span className="px-2 tracking-widest py-1 bg-rose-500 w-min text-zinc-100 rounded-lg">
                40%
              </span>
              <span className="line-through text-zinc-600 italic">
                {formatCurency(
                  parseInt((product.price / (1 - 0.4)).toFixed(2)),
                )}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="font-bold text-4xl tracking-tight">
                {formatCurency(product.price)}
              </div>
              <div className="">
                <span className="font-medium text-base">4.8 (102 reviews)</span>
                <p className="font-extralight text-xs">
                  806 people have purchased this product
                </p>
              </div>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex gap-3 flex-col">
            <p>
              Color <small className="font-extralight">(black)</small>
            </p>
            <div className="flex gap-3">
              <p className=" bg-rose-500 w-4 p-3 rounded-full border-2 cursor-pointer" />
              <p className=" bg-black w-4  p-3  rounded-full border-2 cursor-pointer" />
              <p className=" bg-lime-400 w-4  p-3  rounded-full border-2 cursor-pointer" />
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                Stock: <strong>12 left</strong>
              </div>
              <div className="flex gap-4 px-4 py-3 border rounded-full">
                <Minus
                  onClick={handleDecreaseQuantity}
                  className="cursor-pointer hover:text-zinc-500"
                />
                <span>{quantity}</span>
                <Plus
                  onClick={handleIncreaseQuantity}
                  className="cursor-pointer hover:text-zinc-500"
                />
              </div>
            </div>
            <div className="flex justify-between gap-8">
              <div className="p-3 border rounded-full">
                <Heart size={28} className="text-zinc-500" />
              </div>
              <Button
                variant="outline"
                className="flex-1 py-3 bg-[#5a4199] hover:bg-[#5a419990] text-zinc-200 h-14 border rounded-full flex items-center justify-center gap-4 cursor-pointer"
              >
                <ShoppingCart size={26} />
                <span className="font-semibold text-lg">Add to Cart</span>
              </Button>
            </div>
          </div>
          <article className="">
            {product.description} Ipsum dolor sit amet consectetur adipisicing
            elit. Dignissimos quos illo quam vitae, et vel ipsum. <br />
            Voluptatibus reiciendis similique impedit, fugit culpa iste optio
            deleniti. Blanditiis animi enim officia recusandae?
          </article>
        </section>
      </div>
      <hr className="border-t  border-gray-300 my-20" />
      <div>
        <h2 className="font-bold text-3xl mb-20">Good-matching products</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product: ProductData, index: number) => (
            <div onClick={() => handleClickCard(product.id)} key={index}>
              <CardProduct product={product} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
