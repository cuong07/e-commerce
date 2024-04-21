'use client';
import { adminSidebar } from '@/utils/admin-sidebar';
import React from 'react';
import { SidebarItem } from './sidebar-item';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

export const SidebarMenu = () => {
    return (
        <div className="">
            <div className="h-[80px] border ">LOGO</div>
            <div>
                {adminSidebar.map((item, index) => (
                    <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring' }}
                        key={index}
                    >
                        <SidebarItem
                            icon={item.icon}
                            link={item.link}
                            name={item.name}
                            sub={item.sub}
                            itemIndex={index}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
