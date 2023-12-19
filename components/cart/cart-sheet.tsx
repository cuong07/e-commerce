"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import useCartStore from "@/hooks/use-cart-store";
import useContextStore from "@/hooks/use-context-store";
import { CartData, CartDetailsData } from "@/type";
import Image from "next/image";
import { formatCurency } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const CartSheet = () => {
  const { contextImgageUrl } = useContextStore();
  const { cartDetails, cart } = useCartStore();

  const totalMoney = cartDetails
    .map((item) => item.total_money)
    .reduce((a, b) => a + b, 0);

  const updateCartDetail = (id: number, quantity: number) => {
    // const item = cartDetails.find((item: CartDetailsData) => item.id === id);
    // if (item) {
    //   const newItem = {
    //     ...item,
    //     product_of_number: item?.product_of_number += quantity,
    //   };
    //   console.log(newItem);
    // }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent relative max-md:px-4 max-md:py-6 "
        >
          <ShoppingCart className="" size={20} />
          <Badge className="text-xs absolute top-1 right-1 py-[2px] px-[2px] bg-transparent">
            {cartDetails.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{`My Cart (${cartDetails.length})`}</SheetTitle>
          <SheetDescription>
            Make changes to your cart here. Click checkout when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1">
          {cartDetails.map(
            ({
              product,
              product_of_number,
              total_money,
              id,
            }: CartDetailsData) => (
              <div className="mt-4 hover:bg-zinc-100 p-2 -m-2 rounded-md cursor-pointer transition-all">
                <div className="flex gap-4 space-x-2 justify-between">
                  <div className="flex gap-2 ">
                    <div>
                      <Image
                        src={contextImgageUrl + product.thumbnail}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="object-cover rounded-md overflow-hidden"
                      />
                    </div>
                    <div className="">
                      <h2 className="font-semibold text-md">{product.name}</h2>
                      <article className="text-xs text-zinc-500">
                        {product.description.slice(0, 20)}
                      </article>
                    </div>
                  </div>
                  <span className="cursor-pointer" title="Delete">
                    <Trash2 size={20} className="hover:text-rose-500" />
                  </span>
                </div>
                <div className="ml-16 flex justify-between items-end">
                  <div className="flex px-2 py-1 rounded-full border-[1px] border-zinc-600/50 cursor-pointer items-center z-40">
                    <span onClick={() => updateCartDetail(id, 1)}>
                      <Plus size={18} />
                    </span>
                    <span className="px-2 text-sm">{product_of_number}</span>
                    <span>
                      <Minus size={18} />
                    </span>
                  </div>
                  <strong className="text-lg">
                    {formatCurency(total_money)}
                  </strong>
                </div>
              </div>
            ),
          )}
        </div>
        <SheetFooter>
          <div className="flex flex-col w-full">
            <div className="text-xs font-semibold py-4 flex justify-between w-full border-t-[1px] border-zinc-500">
              <p className="text-base">Total money</p>
              <p className="text-lg font-semibold">
                {formatCurency(totalMoney)}
              </p>
            </div>
            <SheetClose asChild>
              <Button
                variant="primary"
                className="py-6  min-h-[40px] px-2 flex gap-4 rounded-none w-full text-[16px] font-medium"
              >
                Go to checkout!
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
