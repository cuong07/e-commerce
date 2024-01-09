'use client';

import * as z from 'zod';
import Image from 'next/image';
import { Lock, Tag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Form } from '@/components/ui/form';
import { formatCurency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/hooks/use-auth-store';
import useCartStore from '@/hooks/use-cart-store';
import Stepper from '@/components/stepper/stepper';
import { CartDetailsData, UserAddress } from '@/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/hooks/use-modal-store';
import useContextStore from '@/hooks/use-context-store';
import { InputField } from '@/components/input/input-field';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createUserAddress, deleteUserAddress, updateUserAddress } from '@/lib/api/user';

const schema = z.object({
    // email: z
    //     .string()
    //     .min(1, { message: 'This field has to be filled.' })
    //     .email('This is not a valid email.')
    //     .refine((e) => e === 'abcd@fg.com', 'This email is not in our database'),
    address_one: z.string().min(5, { message: 'This field has to be filled.' }),
    address_second: z.string(),
    city: z.string().min(5, { message: 'This field has to be filled.' }),
    province: z.string().min(5, { message: 'This field has to be filled.' }),
    country: z.string().min(5, { message: 'This field has to be filled.' }),
});

const CartCheckout = () => {
    const { currentUser } = useAuthStore();
    const { onOpen } = useModalStore();
    const { contextImgageUrl } = useContextStore();
    const [selectAddress, setSelectAddress] = useState<number>();
    const { cartDetails, cart, totalMoney } = useCartStore();
    const { toast } = useToast();
    const [typeForm, setTypeForm] = useState<'update' | 'create'>('create');
    const router = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        defaultValues: {
            address_one: '',
            address_second: '',
            city: '',
            province: '',
            country: '',
        },
        resolver: zodResolver(schema),
        reValidateMode: 'onBlur',
        mode: 'all',
    });

    const handleError = (error: any) => {
        if (error.response) {
            onOpen('error', {
                message: error.response.data,
                code: error.response.status,
            });
        } else {
            onOpen('error', {
                message: error.message,
                code: error.code,
            });
        }
    };

    useEffect(() => {
        if (currentUser && currentUser?.userAddresses.length > 0) {
            setSelectAddress(currentUser.userAddresses[0].id);
        }
    }, [currentUser]);

    const handleCreate = async (data: z.infer<typeof schema>) => {
        try {
            await createUserAddress(data);
            location.reload();
        } catch (error) {
            handleError(error);
        }
    };

    const handleUpdate = async (data: z.infer<typeof schema>) => {
        try {
            if (!selectAddress) {
                return;
            }
            await updateUserAddress(selectAddress, data);
            location.reload();
        } catch (error) {
            handleError(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteUserAddress(id);
            location.reload();
        } catch (error) {}
    };

    const onSubmit = (data: z.infer<typeof schema>) => {
        if (typeForm === 'create') {
            handleCreate(data);
        }
        if (typeForm === 'update') {
            handleUpdate(data);
        }
    };

    const handleUpdateAddress = (id: number) => {
        setTypeForm('update');
        const updateAddress = currentUser?.userAddresses.find((address) => address.id === id);
        if (updateAddress) {
            form.setValue('address_second', updateAddress.addressSecond);
            form.setValue('address_one', updateAddress.addressOne);
            form.setValue('city', updateAddress.city);
            form.setValue('country', updateAddress.country);
            form.setValue('province', updateAddress.province);
        }
        console.log(updateAddress);
    };

    const handleChangeCheckbox = (value: string) => {
        setSelectAddress(parseInt(value));
    };

    const handleClickContinue = () => {
        if (!selectAddress) {
            return toast({
                description: <span className="flex">Please chose address</span>,
                variant: 'destructive',
            });
        }
        router.push(`/carts/checkout?step=${3}&address_id=${selectAddress}`);
    };

    const handleChangeTypeForm = () => {
        setTypeForm('create');
        form.resetField('address_one');
        form.resetField('address_second');
        form.resetField('city');
        form.resetField('country');
        form.resetField('province');
    };

    return (
        <div>
            <Stepper step={2} />
            <div className="flex gap-6 w-full">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="">
                        <h2 className="text-xl font-semibold my-6">Select address</h2>
                        <RadioGroup className="cursor-pointer" onValueChange={handleChangeCheckbox}>
                            {currentUser?.userAddresses.map((address: UserAddress) => (
                                <div
                                    key={address.id}
                                    className="flex p-4  border rounded-md hover:bg-slate-50 dark:bg-transparent justify-between"
                                >
                                    <Label className="flex gap-2 items-center" htmlFor={`${address.id}`}>
                                        <RadioGroupItem
                                            value={`${address.id}`}
                                            id={`${address.id}`}
                                            className="cursor-pointer"
                                            checked={address.id == selectAddress}
                                        />
                                        <h3 className="cursor-pointer text-base">
                                            {`${address.addressOne}, ${address.province}, ${address.country}`}
                                        </h3>
                                    </Label>
                                    <div className="cursor-pointer text-base flex gap-2">
                                        <Button
                                            variant="link"
                                            className="text-[#4174ec]"
                                            onClick={() => handleUpdateAddress(address.id)}
                                        >
                                            Change
                                        </Button>
                                        <ConfirmModal
                                            buttonName="remove"
                                            buttonType="link"
                                            handleConfirm={() => handleDelete(address.id)}
                                            title="Confirm Address Deletion"
                                            description="This action will remove the selected address from the list. Are you sure you want to proceed?"
                                        />
                                    </div>
                                </div>
                            ))}
                            {!currentUser?.userAddresses && (
                                <h2>You haven`t added any addresses yet. Please add an address.</h2>
                            )}
                        </RadioGroup>
                    </div>
                    <div className="border-t-[1px] border-zinc-400">
                        <div className="flex justify-between my-6">
                            <h2 className="text-xl font-semibold ">Shipping address</h2>
                            <Button variant="link" onClick={handleChangeTypeForm}>
                                Create new address
                            </Button>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <InputField
                                    control={form.control}
                                    name="address_one"
                                    label="Address line 1"
                                    type="text"
                                />
                                <InputField
                                    control={form.control}
                                    name="address_second"
                                    label="Address line 2"
                                    type="text"
                                />
                                <InputField control={form.control} name="province" label="Province" type="text" />
                                <div className="grid grid-cols-2 gap-x-6">
                                    <InputField control={form.control} name="city" label="City" type="text" />
                                    <InputField control={form.control} name="country" label="Country" type="text" />
                                </div>
                                <Button className="w-40 text-base " size="lg" type="submit" variant="primary">
                                    {typeForm === 'create' ? 'Create' : 'Update'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="w-2/5 m-5 p-4 shadow-md">
                    <h2 className=" text-lg font-bold">{currentUser?.fullName}</h2>
                    <p className="text-base font-light text-zinc-500 mb-8">{cart?.note}</p>
                    <ul className="flex flex-col gap-4 mb-8">
                        {cartDetails.map((cart: CartDetailsData) => (
                            <li key={cart.cartId} className="flex justify-between ">
                                <div className="flex gap-2">
                                    <Image
                                        width={60}
                                        height={60}
                                        alt={cart.product.name}
                                        src={contextImgageUrl + cart.product.thumbnail}
                                        className="rounded-md "
                                    />
                                    <div>
                                        <h2 className="font-semibold">{cart.product.name}</h2>
                                        <p className="font-semibold">x{cart.numberOfProduct}</p>
                                    </div>
                                </div>
                                <div className="font-bold">{formatCurency(cart.numberOfProduct * cart.price)}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex border-[1px] border-zinc-400 rounded-md justify-between items-center">
                        <div className="flex flex-1 items-center pl-4 ">
                            <Tag />
                            <Input
                                placeholder="Enter gift card or discount code"
                                disabled
                                className="text-base border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                            />
                        </div>
                        <Button variant="ghost" className="text-[#6895f8]">
                            Apply
                        </Button>
                    </div>
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
                        <p>Continue to payment</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartCheckout;
