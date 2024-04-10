/* eslint-disable @next/next/no-img-element */
'use client';

import { nav } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import NavigationItem from './navigation-item';
import Link from 'next/link';
import Image from 'next/image';

const products: { title: string; href: string; description: string }[] = [
    {
        title: 'Products',
        href: '/products',
        description: 'Have all products',
    },
];

export const Navigation = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Welcome</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex full w-full select-none flex-col justify-end rounded-md bg-contain bg-blend-saturation p-6 no-underline outline-none focus:shadow-md bg-[url('/banner.png')]"
                                        href="/"
                                    >
                                        <div className="h-14 text-lg font-medium text-zinc-200"></div>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <NavigationItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </NavigationItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <div className="p-0">Products</div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 md:p-4 p-0 md:w-[400px]">
                            {products.map((product) => (
                                <NavigationItem key={product.title} title={product.title} href={product.href}>
                                    {product.description}
                                </NavigationItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Collections</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
