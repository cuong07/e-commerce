'use client';
import { FooterMain } from '@/components/footer/footer-main';
import { HeaderSearch } from '@/components/header/header-search';
import { Navigation } from '@/components/navigation/navigation';
import useAuthStore from '@/hooks/use-auth-store';
import useCartStore from '@/hooks/use-cart-store';
import { useModalStore } from '@/hooks/use-modal-store';
import { useEffectOneCall } from '@/hooks/useEffectOneCall';
import { getCurrentCartByUser } from '@/lib/api/cart';
import { getCurrentUser } from '@/lib/api/user';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { getCart, setFetching } = useCartStore();
    const { onOpen } = useModalStore();
    const { loginData, setCurrentUser } = useAuthStore();

    useEffectOneCall(() => {
        if (loginData?.token) {
            (async () => {
                try {
                    setFetching(true);
                    const response = await getCurrentCartByUser();
                    getCart(response);
                } catch (error: any) {
                    setFetching(false);
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
                }
            })();
            (async () => {
                try {
                    const response = await getCurrentUser();
                    setCurrentUser(response);
                } catch (error: any) {
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
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div className="h-full">
            <HeaderSearch />
            <main className="mt-[89px]">
                <div className=" lg:px-40 px-2 justify-between md:flex h-full ">
                    <div className="my-4 ">
                        <Navigation />
                    </div>
                    <div className="md:flex hidden gap-6 items-center">
                        <div className="flex gap-2 items-center">
                            <MapPin size={16} className="dark:text-zinc-300 text-zinc-500" />
                            <p>Store Location</p>
                        </div>
                        <div>Track your order</div>
                    </div>
                </div>
                <div>{children}</div>
            </main>
            <FooterMain />
        </div>
    );
};

export default MainLayout;
