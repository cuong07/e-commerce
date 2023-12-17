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

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const CartSheet = () => {
  const [quantity, setQuantity] = useState<number>(2);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent">
          <ShoppingCart size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{`My Cart (${quantity})`}</SheetTitle>
          <SheetDescription>
            Make changes to your cart here. Click checkout when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 bg-zinc-500"></div>
        <SheetFooter>
          <div className="flex flex-col w-full">
            <div className="text-xs font-semibold py-4 flex justify-between w-full border-t-[1px] border-zinc-500">
              <p>Total money</p>
              <p>$45.66</p>
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
