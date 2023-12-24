'use client';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CategoryData } from '@/type';
import { cn } from '@/lib/utils';

export const SidebarItem = ({ item, categories }: { item: any; categories: CategoryData[] }) => {
    return (
        <Accordion type="multiple" autoFocus className="w-full p-2">
            <AccordionItem value="number" className="">
                <AccordionTrigger className="hover:no-underline py-2">{item.name}</AccordionTrigger>
                {item.type === 'radio' && (
                    <AccordionContent>
                        <RadioGroup className="pb-0">
                            {categories?.map((item: any, index: number) => (
                                <div className="flex gap-2 items-center" key={index}>
                                    <RadioGroupItem id={`terms${index}`} value={`terms${index}`} />
                                    <label htmlFor={`terms${index}`}>{item.name}</label>
                                </div>
                            ))}
                        </RadioGroup>
                    </AccordionContent>
                )}
                {item.type === 'nomal' && (
                    <div className="flex gap-2 pb-2 flex-wrap">
                        {item.data.map((item: any) => (
                            <AccordionContent className={``} key={item.id}>
                                <div
                                    className="rounded-md py-1 px-3 cursor-pointer transition-all"
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
