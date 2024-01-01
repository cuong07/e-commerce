import { DoorOpen, Facebook, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import React from 'react';

export const FooterMain = () => {
    return (
        <>
            <div className=" md:px-40 p-4 grid md:grid-cols-2  grid-cols-1 bg-zinc-100 dark:bg-transparent py-20 mt-40">
                <div className="">
                    <h2 className="font-bold text-2xl mb-4">CShop</h2>
                    <p className="font-light text-zinc-700 dark:text-zinc-200">
                        Easy & reliable online buying and selling site
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 gap-y-6 md:mt-0 mt-6">
                    <div>
                        <h2 className="font-bold text-lg mb-4">Company</h2>
                        <div className="flex flex-col gap-2">
                            <span>About</span>
                            <span>Career</span>
                            <span>Privacy Policy</span>
                            <span>Blogs</span>
                            <span>Flash Sales</span>
                            <span>Affiliates</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg mb-4">Buyer</h2>
                        <div className="flex flex-col gap-2">
                            <span>How to shop</span>
                            <span>Payment method</span>
                            <span>Track Buyer Orders</span>
                            <span>Blogs</span>
                            <span>Free Shipping</span>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="font-bold text-lg mb-4">Contact us</h2>
                        <div className="flex flex-col gap-4">
                            <span className="flex gap-2 items-center font-medium">
                                <Phone size={20} /> (032).742.7732
                            </span>
                            <span className="flex gap-2 items-center font-medium">
                                <Mail size={20} /> front.cuong@gmail.com
                            </span>
                            <span className="flex gap-2 items-center font-medium">
                                <DoorOpen size={20} /> Moday - Friday: 09.00 - 16.00 WIB
                            </span>
                            <span className="flex gap-2 items-center font-medium">
                                <Twitter size={20} />
                                <Facebook size={20} />
                                <Linkedin size={20} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
