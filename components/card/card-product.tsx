'use client';
import { CartDetailDTO, ProductData } from '@/type';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '../ui/button';
import { formatCurency } from '@/lib/utils';
import useCartStore from '@/hooks/use-cart-store';
import { createCartDetail } from '@/lib/api/cart';
import { useToast } from '@/hooks/use-toast';
import { CheckCheck, ShoppingCartIcon } from 'lucide-react';
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
        <Card className="flex flex-col h-[320px] rounded-md  cursor-pointer">
            <CardContent className="p-0 h-[70%] relative group ">
                <Carousel className="h-full w-full overflow-hidden ">
                    <CarouselContent>
                        {product?.product_images.map((image) => (
                            <CarouselItem key={image.id}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                                        <Image
                                            src={contextImgageUrl + image.image_url}
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
            </CardContent>
            <CardFooter
                className="p-2 flex justify-between flex-1  flex-col items-start"
                onClick={(e) => handleClick(e, product.id)}
            >
                <div className="flex flex-col">
                    <h2 className="font-medium text-base hover:underline">{product.name}</h2>
                    <p className="text-sm font-extralight">{product.description.substring(20)}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                    <p className="font-bold">{formatCurency(product.price)}</p>
                    <Button variant="outline" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAddToCart(e)}>
                        <ShoppingCartIcon />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
