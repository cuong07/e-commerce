'use client';

import { CartDetailDTO, ProductData } from '@/type';
import Image from 'next/image';
import React from 'react';
import { Check, CheckCheck, CheckSquare2, LucideShoppingCart, ShoppingCart, ShoppingCartIcon } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '../ui/button';
import { formatCurency } from '@/lib/utils';
import useCartStore from '@/hooks/use-cart-store';
import { createCartDetail } from '@/lib/api/cart';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import useContextStore from '@/hooks/use-context-store';
import { useAlertStore } from '@/hooks/use-alert-store';
import useAuthStore from '@/hooks/use-auth-store';

export const CardProduct = ({
    product,
    handleClick,
}: {
    product: ProductData;
    handleClick: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
}) => {
    const { cart, setCartDetail } = useCartStore();
    const { loginData } = useAuthStore();
    const { toast } = useToast();
    const { contextImgageUrl } = useContextStore();
    const { onOpen } = useAlertStore();

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!loginData?.token) {
            onOpen('warning', {
                link: '/sign-in',
                message: 'Log in to add to the cart',
                description:
                    ' Log in to add to the cart. Enjoy personalized shopping and track your orders seamlessly.',
            });
            return;
        }
        try {
            if (cart) {
                const newCartDetail: CartDetailDTO = {
                    cart_id: cart?.id,
                    product_id: product.id,
                    number_of_product: 1,
                    price: product.price,
                    total_money: product.price,
                    color: '#ffffff',
                };
                const response = await createCartDetail(newCartDetail);
                setCartDetail(response);
                toast({
                    description: (
                        <span className="flex">
                            Successfully <CheckCheck />
                        </span>
                    ),
                    variant: 'success',
                });
            }
        } catch (error) {}
    };

    return (
        <Card className="flex flex-col min-h-[360px] rounded-md relative overflow-hidden shadow-sm cursor-pointer hover:shadow-xl transition-all">
            <CardContent className="p-0 h-[70%] relative group overflow-hidden">
                <Carousel className="h-full w-full overflow-hidden ">
                    <CarouselContent>
                        {product?.productImages.map((image) => (
                            <CarouselItem key={image.id}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                                        <Image
                                            src={contextImgageUrl + image.imageUrl}
                                            alt={product.name}
                                            fill
                                            sizes="100vw"
                                            className="object-cover hover:scale-110 scale-105 transition-all"
                                        />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="z-10 group-hover:flex hidden transition-opacity" />
                    <CarouselNext className="z-10 group-hover:flex hidden transition-opacity" />
                </Carousel>
                {product.productImages.length === 0 && (
                    <Card className="w-full h-full ">
                        <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                            <Image
                                src={`https://fl-1.cdn.flockler.com/embed/no-image.svg`}
                                alt={product.name}
                                fill
                                sizes="100vw"
                                className="object-cover hover:scale-110 scale-105 transition-all"
                            />
                        </CardContent>
                    </Card>
                )}
            </CardContent>
            <CardFooter
                className="p-2 flex justify-between flex-1  flex-col items-start"
                onClick={(e) => handleClick(e, product.id)}
            >
                <div className="flex flex-col">
                    <h2 className="font-medium text-base hover:underline">{product.name.substring(0, 20)}</h2>
                    <p className="text-sm font-extralight">{product.description.substring(0, 20)}...</p>
                </div>
                <div className="flex justify-between w-full items-center">
                    <div className="flex gap-2  items-center">
                        <p className="font-bold text-base md:text-2xl text-primary">{formatCurency(product.price)}</p>
                        <p className="text-xs italic line-through">{formatCurency(product.price)}</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAddToCart(e)}
                        className="px-8 bg-primary-foreground rounded-md"
                    >
                        <LucideShoppingCart size={20} />
                    </Button>
                </div>
            </CardFooter>
            <div className="absolute gap-2 flex items-center top-0 left-0 bg-zinc-400 px-2 py-1 rounded-br-md text-white font-semibold text-xs uppercase">
                co-check <CheckSquare2 size={18} fill="#222" stroke="#f0ec17" />
            </div>
        </Card>
    );
};
