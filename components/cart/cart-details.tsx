import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCartStore from '@/hooks/use-cart-store';
import useContextStore from '@/hooks/use-context-store';
import { formatCurency } from '@/lib/utils';
import { ProductData, CartDetailsData } from '@/type';
import { defaults } from 'lodash';
import { Check, Lock, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Stepper from '../stepper/stepper';
import { useRouter } from 'next/navigation';
import { updateQuantityCartDetail } from '@/lib/api/cart';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const CartDetails = () => {
    const { cartDetails, totalMoney } = useCartStore();
    const { contextImgageUrl } = useContextStore();
    const router = useRouter();
    const { setCartDetail } = useCartStore();
    const { toast } = useToast();

    const handleClickContinue = () => {
        if (cartDetails && cartDetails.length <= 0) {
            return toast({
                description: <span className="flex">Cart is empty</span>,
                variant: 'destructive',
            });
        }
        router.push(`/carts/checkout?step=${2}`);
    };

    const updateCartDetail = async (id: number, quantity: number) => {
        try {
            const response = await updateQuantityCartDetail(id, quantity);
            setCartDetail(response);
            toast({
                variant: 'success',
                description: (
                    <div className="flex gap-2 items-center">
                        <Check />
                        <span>Updated quantity successfully</span>
                    </div>
                ),
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'Updated quantity error',
                description: Date.now(),
            });
        }
    };

    return (
        <div className="flex flex-col ">
            <div className="flex flex-col gap-6 w-full ">
                <Stepper step={1} />
                <div className="flex md:flex-row flex-col gap-6 ">
                    <div className="md:w-3/4 w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead align="center">Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartDetails.map((cart: CartDetailsData) => (
                                    <TableRow
                                        key={cart.totalMoney}
                                        className="cursor-pointer hover:bg-zinc-200/50  dark:hover:bg-zinc-900"
                                    >
                                        <TableCell className="flex gap-3">
                                            <Image
                                                width={60}
                                                height={60}
                                                src={contextImgageUrl + cart.product.thumbnail}
                                                alt={cart.product.name}
                                                className="rounded-md shadow-sm"
                                            />
                                            <div className="flex flex-col gap-4">
                                                <h2 className="font-semibold text-base">{cart.product.name}</h2>
                                                <div
                                                    className={`bg-[${cart.color}] w-4 h-4 rounded-full border-[1px] border-zinc-200`}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="">
                                            <div className="flex gap-2 border-[1px] border-zinc-500  items-center max-w-max p-1 rounded-full">
                                                <span onClick={() => updateCartDetail(cart.id, 1)}>
                                                    <Plus size={20} />
                                                </span>
                                                <span> {cart.numberOfProduct}</span>
                                                <span onClick={() => updateCartDetail(cart.id, -1)}>
                                                    <Minus size={20} />
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {formatCurency(cart.totalMoney)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {cartDetails.length === 0 && (
                            <h1 className="text-center w-full text-lg font-semibold my-10">
                                Cart is empty.{' '}
                                <Link href="/products" className="hover:underline text-[#6366f1]">
                                    Go back to shopping!
                                </Link>
                            </h1>
                        )}
                    </div>
                    <div className="md:h-[400px] rounded-[16px] md:p-8 bg-zinc-100/50 shadow-md flex-1 dark:bg-zinc-900 ">
                        <h2>Order Summary</h2>
                        <hr className="border-b-2 border-zinc-300/50 my-4" />
                        <div className="flex flex-col gap-4">
                            <div className="font-medium flex justify-between">
                                <p>Total money</p>
                                <p className="">{formatCurency(totalMoney)}</p>
                            </div>
                            <div className="font-medium flex justify-between">
                                <p>Tax</p>
                                <p className="">$00</p>
                            </div>
                            <div className=" justify-between font-medium flex ">
                                <p>Shipping</p>
                                <p className="">$3</p>
                            </div>
                        </div>
                        <hr className="border-b-2 border-zinc-300/50 my-4" />
                        <div className="flex justify-between text-2xl font-bold">
                            <p>Total</p>
                            <strong>{formatCurency(totalMoney - 3)}</strong>
                        </div>
                        <Button
                            variant="primary"
                            className="py-6 my-6 min-h-[40px] px-2 flex gap-4 rounded-full w-full text-[16px] font-medium"
                            onClick={handleClickContinue}
                        >
                            <Lock size={16} />
                            <p>Continue to checkout</p>
                        </Button>
                    </div>
                </div>
            </div>
            {/* <div>:</div> */}
        </div>
    );
};

export default CartDetails;
