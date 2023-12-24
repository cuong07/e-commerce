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

export const CardProduct = ({
    product,
    handleClick,
}: {
    product: ProductData;
    handleClick: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
}) => {
    const { cart, setCartDetail } = useCartStore();
    const { toast } = useToast();

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
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
                            Successfully <CheckCheck />{' '}
                        </span>
                    ),
                    variant: 'success',
                });
            }
        } catch (error) {}
    };

    return (
        <Card
            className="flex flex-col h-[320px] rounded-md overflow-hidden cursor-pointer"
            onClick={(e) => handleClick(e, product.id)}
        >
            <CardContent className="p-0 h-[70%] overflow-hidden">
                <div className="relative h-full w-full">
                    <Image
                        src={product.url}
                        alt={product.name}
                        layout="fill" // Fill the container
                        objectFit="cover" // Maintain aspect ratio and cover container
                        className="object-cover hover:scale-110 scale-105 transition-all"
                    />
                </div>
            </CardContent>
            <CardFooter className="p-2 flex justify-between flex-1  flex-col items-start">
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
