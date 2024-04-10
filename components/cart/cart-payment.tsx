import Image from 'next/image';
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import Stepper from '@/components/stepper/stepper';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurency } from '@/lib/utils';
import useCartStore from '@/hooks/use-cart-store';
import { Button } from '@/components/ui/button';
import { createOrderCOD, createOrderWithPayment, getPaymentNVPay, getPaymentStatus } from '@/lib/api/order';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { OrderDTO } from '@/type';
import useAuthStore from '@/hooks/use-auth-store';
import { useToast } from '@/hooks/use-toast';

const PaymentType = [
    {
        name: 'Momo',
        url: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
        id: 1,
    },
    {
        name: 'Paypal',
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png',
        id: 2,
    },
    {
        name: 'NVPay',
        url: 'https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg',
        id: 3,
    },
    {
        name: 'COD (Cash On Delivery)',
        url: 'https://www.mungbaobao.com/upload/news/2019/05/19/12/08/14/icon-thanh-toan-1.png?v=1',
        id: 4,
    },
];

const CartPayment = () => {
    const [paymentId, setPaymentId] = useState<number>(PaymentType[2].id);
    const [isShow, setIsShow] = useState<boolean>(false);
    const { totalMoney, cart, cartDetails } = useCartStore();
    const { currentUser } = useAuthStore();
    const pathName = useSearchParams();
    const { toast } = useToast();
    const router = useRouter();

    const addressId = pathName.get('address_id');

    const handleChangePayment = (value: string) => {
        setPaymentId(parseInt(value));
    };

    const handleClickContinue = async () => {
        if (!currentUser) {
            return toast({
                description: <span className="flex">Please to login</span>,
                variant: 'destructive',
            });
        }

        if (!addressId) {
            return toast({
                description: <span className="flex">Please select address</span>,
                variant: 'destructive',
            });
        }

        if (cartDetails && cartDetails.length <= 0) {
            return toast({
                description: <span className="flex">Cart is empty</span>,
                variant: 'destructive',
            });
        }

        if (paymentId === 4) {
            const newOrder: OrderDTO = {
                email: 'front.cuong@gmail.com',
                fullname: currentUser?.fullName,
                note: cart?.note,
                payment_method: 'COD',
                phone_number: currentUser?.phoneNumber,
                shipping_address: '',
                shipping_method: '',
                total_money: totalMoney,
                address_id: parseInt(addressId),
            };
            try {
                setIsShow(false);
                const response = await createOrderCOD(newOrder);
                if (response.status === 200) {
                    toast({
                        description: <span className="flex">Order success</span>,
                        variant: 'success',
                    });
                    return router.push('/carts/checkout/success');
                } else {
                    setIsShow(false);
                    return toast({
                        description: <span className="flex">Order error</span>,
                        variant: 'destructive',
                    });
                }
            } catch (error) {
                setIsShow(false);
                return toast({
                    description: <span className="flex">Order error</span>,
                    variant: 'destructive',
                });
            }
        }

        if (paymentId === 3 && cart) {
            const { url } = await getPaymentNVPay(parseInt((totalMoney * 23000).toFixed(2)), cart?.note);
            setIsShow(true);
            window.open(url, '_blank');
        }
    };

    const handleOrder = async () => {
        if (!currentUser) {
            return toast({
                description: <span className="flex">Please to login</span>,
                variant: 'destructive',
            });
        }

        if (!addressId) {
            return toast({
                description: <span className="flex">Please select address</span>,
                variant: 'destructive',
            });
        }
        const response = await getPaymentStatus();
        if (response.status) {
            const newOrder: OrderDTO = {
                email: 'front.cuong@gmail.com',
                fullname: currentUser?.fullName,
                note: cart?.note,
                payment_method: paymentId === 3 ? 'VNPay' : 'COD',
                phone_number: currentUser?.phoneNumber,
                shipping_address: '',
                shipping_method: '',
                total_money: totalMoney,
                address_id: parseInt(addressId),
            };

            try {
                setIsShow(false);
                const response = await createOrderWithPayment(newOrder);
                if (response.status === 200) {
                    return toast({
                        description: <span className="flex">Order success</span>,
                        variant: 'success',
                    });
                } else {
                    setIsShow(false);
                    return toast({
                        description: <span className="flex">Order error</span>,
                        variant: 'destructive',
                    });
                }
            } catch (error) {
                setIsShow(false);
                return toast({
                    description: <span className="flex">Order error</span>,
                    variant: 'destructive',
                });
            }
        }
        setIsShow(false);
        return toast({
            description: <span className="flex">Payment error</span>,
            variant: 'destructive',
        });
    };

    return (
        <div>
            <Stepper step={3} />
            <div className="flex justify-around mt-10">
                <div className="w-1/4">
                    <RadioGroup className="flex flex-col gap-4 " onValueChange={handleChangePayment}>
                        {PaymentType.map((item) => (
                            <Label
                                key={item.name}
                                htmlFor={item.name}
                                className="flex gap-2 items-center p-2 shadow-md rounded-md"
                            >
                                <RadioGroupItem
                                    value={`${item.id}`}
                                    id={item.name}
                                    checked={paymentId === item.id}
                                    disabled={item.id === 1 || item.id === 2}
                                />
                                <Image width={40} height={40} src={item.url} alt={item.name} />
                                <h2 className="font-semibold text-lg flex-1 flex justify-between items-center">
                                    {item.name}
                                    <span className="text-xs font-light text-zinc-400 animate-pulse">
                                        {item.id === 1 || item.id === 2 ? 'updating...' : ''}
                                    </span>
                                </h2>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
                <div className="w-1/4 shadow-md p-2">
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
                        <DollarSign size={16} />
                        <p>Continue</p>
                    </Button>
                </div>
            </div>
            <ConfirmModal
                buttonName="Confirm"
                buttonType="primary"
                title="Checking Payment Status"
                description="Hi there! We'd like to confirm whether your payment has been 
                successfully processed. Could you please let us know if you've completed the 
                payment transaction? Your prompt response will help us ensure a smooth experience for you. Thank you!"
                handleConfirm={handleOrder}
                isShow={isShow}
                handleClose={() => setIsShow(false)}
                trigger={false}
            />
        </div>
    );
};

export default CartPayment;
