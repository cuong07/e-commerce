//IMAGE
import image_1 from "@/assets/home/image-banner-1.jpg";
import image_2 from "@/assets/home/image-banner-2.jpg";
import image_3 from "@/assets/home/image-banner-3.jpg";
import image_4 from "@/assets/home/image-banner-4.jpg";
import image_5 from "@/assets/home/image-banner-5.jpg";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurency = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const nav = [
  {
    text: "Room",
    link: "/rooms",
  },
  {
    text: "Product",
    link: "/products",
  },
  {
    text: "Blog",
    link: "/blogs",
  },
  {
    text: "Collections",
    link: "/collections",
  },
  {
    text: "Contact",
    link: "/contact",
  },
];

export const banners = [
  {
    titile: "NATURE'S HARDEST ELEMENT. OUR NEWEST SOFT SHELL.",
    description:
      "Explore Veles, the graphene-enhanced technical layer for Autumn/Winter pursuits.",
    image: image_1,
    pos: "center",
    action: [
      {
        title: "Shop Veles",
        type: "button",
        link: "/veles",
      },
    ],
  },
  {
    titile: "OUR LIGHTEST INSULATION YET.",
    description:
      "Ithax - our newest range of insulated jackets and gilets to be carried  <br /> everywhere from alpine faces to remote places.",
    image: image_2,
    pos: "center",
    action: [
      {
        title: "Shop ithax",
        type: "button",
        link: "/ithax",
      },
    ],
  },
  {
    titile: "TURN UP THE HEAT.",
    description:
      "Discover reliable winter staples from performance fleeces to award-winning mid layers.",
    image: image_3,
    pos: "end",
    action: [
      {
        title: "Shop men's",
        type: "button",
        link: "/men",
      },
      {
        title: "Shop women's",
        type: "button",
        link: "/women",
      },
    ],
  },
  {
    titile: "TRIED AND TESTED.",
    description:
      "Discover reliable winter staples from performance fleeces to award-winning mid layers.",
    image: image_4,
    pos: "center",
    action: [
      {
        title: "Shop men's",
        type: "button",
        link: "/men",
      },
      {
        title: "Shop women's",
        type: "button",
        link: "/women",
      },
    ],
  },
  {
    titile: "DON'T STOP.",
    description:
      "Discover reliable winter staples from performance fleeces to award-winning mid layers.",
    image: image_5,
    pos: "center",
    action: [
      {
        title: "Shop men's",
        type: "button",
        link: "/men",
      },
      {
        title: "Shop women's",
        type: "button",
        link: "/women",
      },
    ],
  },
];
