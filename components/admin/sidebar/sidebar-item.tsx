'use client';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SidebarItemProps {
    name: string;
    link: string;
    itemIndex: number;
    icon: React.ReactNode;
    sub: { name: string; link: string; icon: React.ReactNode }[];
}

export const SidebarItem = ({ icon, link, name, sub, itemIndex }: SidebarItemProps) => {
    return (
        <Collapsible className="w-full transition">
            <CollapsibleTrigger className="p-3 hover:bg-black hover:text-white w-full animate-accordion-up">
                <div className="flex gap-2 items-center">
                    <span className="text-xs">{icon}</span>
                    <span className="text-md">{name}</span>
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="bg-zinc-50">
                <motion.div
                    variants={{
                        hidden: { opacity: 1, scale: 0 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.09,
                            },
                        },
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {sub.map((item, index) => (
                        <motion.div
                            variants={{
                                hidden: { y: 10, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                },
                            }}
                            key={index}
                        >
                            <Link
                                href={`/admin/${item.link}`}
                                className="flex gap-2 items-center px-6 py-2 text-xs hover:bg-black cursor-pointer hover:text-white"
                            >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </CollapsibleContent>
        </Collapsible>
    );
};
