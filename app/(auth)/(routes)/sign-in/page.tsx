'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import loginImageSrc from '@/assets/undraw_Login_re_4vu2.png';
import { InputField } from '@/components/input/input-field';
import CursorProvider from '@/components/providers/cursor-provider';
import { signin } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { UserLoginType } from '@/type';
import useAuthStore from '@/hooks/use-auth-store';
import { useModalStore } from '@/hooks/use-modal-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
    phoneNumber: z
        .string()
        .refine((value) => /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value), 'Phone number is not valid'),
    password: z.string().min(8),
});

const Page = () => {
    const router = useRouter();
    const { login } = useAuthStore();
    const { onOpen } = useModalStore();
    const form = useForm<z.infer<typeof schema>>({
        defaultValues: {
            phoneNumber: '0327427732',
            password: 'Azqc2003',
        },
        resolver: zodResolver(schema),
        reValidateMode: 'onBlur',
        mode: 'all',
    });

    const onSubmit = async (value: z.infer<typeof schema>) => {
        try {
            const response = await signin(value);
            login(response);
            form.reset();
            router.push('/');
        } catch (error: any) {
            console.log('Error fetching products:', error.response);
            onOpen('error', {
                message: error.response.data.message,
                code: error.response.status,
            });
        }
    };

    return (
        <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                            <div className="grid gap-4">
                                <InputField
                                    control={form.control}
                                    name="phone_number"
                                    label="Phone number"
                                    icon={<User size={20} className="text-zinc-600" />}
                                    type="text"
                                />

                                <InputField control={form.control} name="password" label="Password" type="password" />
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/banner.png"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
};

export default Page;
