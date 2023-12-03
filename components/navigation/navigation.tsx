"use client";

import { nav } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NavigationItem from "./navigation-item";
import Link from "next/link";

const products: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
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
                    <div className="h-6 w-6">Logo</div>
                    <div className="mb-2 mt-4 text-lg font-medium">CShop</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                      reprehenderit enim labore culpa sint ad nisi Loremi
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <NavigationItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </NavigationItem>
              <NavigationItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </NavigationItem>
              <NavigationItem
                href="/docs/primitives/typography"
                title="Typography"
              >
                Styles for headings, paragraphs, lists...etc
              </NavigationItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {products.map((product) => (
                <NavigationItem
                  key={product.title}
                  title={product.title}
                  href={product.href}
                >
                  {product.description}
                </NavigationItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/collections" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Collections
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/collections" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Collections
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
