import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export const SidebarItem = (item: any) => {
  return (
    <Accordion type="multiple" autoFocus className="w-full p-2">
      <AccordionItem value="number" className="">
        <AccordionTrigger className="hover:no-underline py-2">
          {item.item.name}
        </AccordionTrigger>
        {item.item.type === "radio" &&
          item.item.data.map((item: any, index: number) => (
            <AccordionContent className="flex gap-2">
              <Checkbox id={`terms${index}`} itemType="radio" />
              <label htmlFor={`terms${index}`}>{item.name}</label>
            </AccordionContent>
          ))}
        {item.item.type === "nomal" && (
          <div className="flex gap-2 pb-2">
            {item.item.data.map((item: any) => (
              <AccordionContent className="border-zinc-400 border rounded-md py-1 px-3 \\">
                {item.name}
              </AccordionContent>
            ))}
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};
