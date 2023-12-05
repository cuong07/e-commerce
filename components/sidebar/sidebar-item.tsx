import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const SidebarItem = (item: any) => {
  return (
    <Accordion type="multiple" autoFocus className="w-full p-2">
      <AccordionItem value="number" className="">
        <AccordionTrigger className="hover:no-underline py-2">
          {item.item.name}
        </AccordionTrigger>
        {item.item.type === "radio" && (
          <AccordionContent>
            <RadioGroup className="pb-0">
              {item.item.data.map((item: any, index: number) => (
                <div className="flex gap-2 items-center">
                  <RadioGroupItem
                    id={`terms${index}`}
                    value={`terms${index}`}
                  />
                  <label htmlFor={`terms${index}`}>{item.name}</label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        )}
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
