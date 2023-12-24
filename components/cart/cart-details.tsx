import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCartStore from '@/hooks/use-cart-store';
import useContextStore from '@/hooks/use-context-store';
import { formatCurency } from '@/lib/utils';
import { ProductData } from '@/type';
import { defaults } from 'lodash';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import Stepper from '../stepper/stepper';
import { useRouter } from 'next/navigation';

export interface CartDetailsProps {}

export type CartData = {
    color: string;
    number_of_product: number;
    total_money: number;
    product: ProductData;
};

const CartDetails = () => {
    const { cartDetails, totalMoney } = useCartStore();
    const { contextImgageUrl } = useContextStore();
    const router = useRouter();

    const handleClickContinue = () => {
        router.push(`/carts/checkout?step=${2}`);
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
                                {cartDetails.map((cart: CartData) => (
                                    <TableRow key={cart.total_money} className="cursor-pointer hover:bg-zinc-200/50 ">
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
                                        <TableCell>{cart.number_of_product}</TableCell>
                                        <TableCell>{formatCurency(cart.total_money)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="md:h-[400px] rounded-[16px] md:p-8 bg-zinc-100/50 shadow-md flex-1  ">
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
                            <div className="font-medium flex justify-between">
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
            <div>:</div>
        </div>
    );
};

export default CartDetails;
