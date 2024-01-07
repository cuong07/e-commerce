'use client';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CategoryData } from '@/type';
import { Label } from '../ui/label';

export const SidebarItem = ({
    item,
    categories,
    handleChange,
}: {
    item: any;
    categories: CategoryData[];
    handleChange: (value: string) => void;
}) => {
    useEffect(() => {}, []);

    return (
        <Accordion type="multiple" className="w-full p-2">
            <AccordionItem value="number" className="">
                <AccordionTrigger className="hover:no-underline py-2">{item.name}</AccordionTrigger>
                {item.type === 'radio' && (
                    <AccordionContent>
                        <RadioGroup className="pb-0" onValueChange={handleChange} defaultValue="0">
                            <Label htmlFor={`0`} className="flex gap-2 items-center">
                                <RadioGroupItem id={`0`} value={`0`} />
                                <h2 className="text-base">All</h2>
                            </Label>
                            {categories?.map((item: any, index: number) => (
                                <Label htmlFor={`${item.id}`} className="flex gap-2 items-center" key={index}>
                                    <RadioGroupItem id={`${item.id}`} value={`${item.id}`} />
                                    <h2 className="text-base">{item.name}</h2>
                                </Label>
                            ))}
                        </RadioGroup>
                    </AccordionContent>
                )}
                {item.type === 'nomal' && (
                    <div className="flex gap-2 pb-2 flex-wrap">
                        {item.data.map((item: any) => (
                            <AccordionContent className={``} key={item.id}>
                                <div
                                    className="rounded-md py-1 px-3 cursor-pointer transition-all text-zinc-400"
                                    style={{ backgroundColor: item.value }}
                                >
                                    {item.name}
                                </div>
                            </AccordionContent>
                        ))}
                    </div>
                )}
            </AccordionItem>
        </Accordion>
    );
};
