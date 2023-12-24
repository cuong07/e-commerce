import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductData } from '@/type';
import { defaults } from 'lodash';
import { Lock } from 'lucide-react';
import Image from 'next/image';

export interface CartDetailsProps {}

export type CartData = {
    color: string;
    number_of_product: number;
    total_money: number;
    product: ProductData;
};

// const DUMMY_CART: CartData[] = [
//   {
//     color: "Blue",
//     number_of_product: 2,
//     total_money: 660,
//     product: {
//       thumbnail: "",
//       name: "LG Front Loading D3V Washing Machine",
//     },
//   },
//   {
//     color: "Blue",
//     number_of_product: 2,
//     total_money: 660,
//     product: {
//       thumbnail: "",
//       name: "LG Front Loading D3V Washing Machine",
//     },
//   },
// ];

const CartDetails = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-6 w-full">
                <h2>Cart Details</h2>
                <div className="flex md:flex-row flex-col gap-6 ">
                    <div className="md:w-3/4 w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Total money</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* {DUMMY_CART.map((cart: CartData) => (
                  <TableRow key={cart.total_money}>
                    <TableCell className="flex gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={cart.product.thumbnail}
                        alt={cart.product.name}
                      />
                      <div>
                        <h2>{cart.product.name}</h2>
                        <h2>{cart.color}</h2>
                      </div>
                    </TableCell>
                    <TableCell>{cart.number_of_product}</TableCell>
                    <TableCell>{cart.total_money}</TableCell>
                  </TableRow>
                ))} */}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="md:h-[400px] rounded-[16px] md:p-6 bg-zinc-200/50 flex-1">
                        <h2>Order Summary</h2>
                        <hr className="border-b-2 border-zinc-300/50 my-4" />
                        <div className="flex flex-col gap-4">
                            <div className="font-medium flex justify-between">
                                <p>Total money</p>
                                <p className="">$996</p>
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
                            <strong>$955</strong>
                        </div>
                        <Button
                            variant="primary"
                            className="py-6 my-6 min-h-[40px] px-2 flex gap-4 rounded-full w-full text-[16px] font-medium"
                        >
                            <Lock size={16} />
                            <p>Continue to payment</p>
                        </Button>
                    </div>
                </div>
            </div>
            <div>:</div>
        </div>
    );
};

export default CartDetails;
