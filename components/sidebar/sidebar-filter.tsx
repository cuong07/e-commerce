"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarItem } from "./sidebar-item";

const DUMMY_DATA = [
  {
    name: "Category",
    type: "radio",
    data: [
      {
        name: "Ao Quan",
        id: 1,
      },
      {
        name: "Thiet Bi dien tu",
        id: 2,
      },
      {
        name: "Do gia dung",
        id: 3,
      },
      {
        name: "Cuong",
        id: 4,
      },
    ],
  },
  {
    name: "Color",
    type: "nomal",
    data: [
      {
        name: "Red",
        id: 1,
      },
      {
        name: "Red",
        id: 2,
      },
      {
        name: "Red",
        id: 3,
      },
    ],
  },
  {
    name: "Size",
    type: "nomal",
    data: [
      {
        name: "M",
        id: 1,
      },
      {
        name: "XL",
        id: 2,
      },
      {
        name: "S",
        id: 3,
      },
    ],
  },
];

export const SidebarFilter = () => {
  return (
    <>
      {DUMMY_DATA.map((data, index) => (
        <SidebarItem item={data} key={index} />
      ))}
    </>
  );
};
