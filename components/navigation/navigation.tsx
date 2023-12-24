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
                                        className="flex h-full w-full select-none flex-col
                    justify-end rounded-md bg-gradient-to-b from-zinc-700/50
                    to-zinc-600 p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="h-6 w-6 text-zinc-200">Logo</div>
                                        <div className="mb-2 mt-4 text-lg font-medium text-zinc-200">CShop</div>
                                        <p className="text-sm leading-tight  text-zinc-200">
                                            Discover clothing than enhances your lifestyle. Explore a world-class
                                            selection of top-quantity apparel toilored to your needs and style
                                            preferences.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>

                            <NavigationItem href="/docs" title="Introduction"></NavigationItem>
                            <NavigationItem href="/docs/installation" title="Installation">
                                How to install dependencies and structure your app.
                            </NavigationItem>
                            <NavigationItem href="/docs/primitives/typography" title="Typography">
                                Styles for headings, paragraphs, lists...etc
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
                    <Link href="/collections" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Collections</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/collections" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Collections</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
