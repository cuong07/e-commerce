"use client";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import loginImageSrc from "@/assets/undraw_Login_re_4vu2.png";
import { InputField } from "@/components/input/input-field";
import CursorProvider from "@/components/providers/cursor-provider";
import { signin } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { UserLoginType } from "@/type";
import useAuthStore from "@/hooks/use-auth-store";
import { useModalStore } from "@/hooks/use-modal-store";

const schema = z.object({
  phone_number: z
    .string()
    .refine(
      (value) => /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value),
      "Phone number is not valid"
    ),
  password: z.string().min(8),
});

const Page = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const { onOpen } = useModalStore();
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      phone_number: "0327427732",
      password: "Azqc2003",
    },
    resolver: zodResolver(schema),
    reValidateMode: "onBlur",
    mode: "all",
  });

  const onSubmit = async (value: z.infer<typeof schema>) => {
    try {
      const response = await signin(value);
      login(response);
      form.reset();
      router.push("/");
    } catch (error: any) {
      console.log("Error fetching products:", error.response);
      onOpen("error", {
        message: error.response.data.message,
        code: error.response.status,
      });
    }
  };

  return (
    <div className="md:w-[70vw] w-[90vw] h-[60vh] md:h-[80vh] rounded-lg bg-white shadow-md flex flex-col">
      <div className="flex flex-1 items-center">
        <div className="flex-1 hidden md:block">
          <h2 className="text-center text-4xl space-x-0 leading-tight tracking-tighter ">
            Welcome To CShop
          </h2>
          <article className="text-center font-thin">
            Pioneering the modern shopping experience"
          </article>
          <Image src={loginImageSrc} alt="Login image" />
        </div>
        <div className="flex-1 flex flex-col px-4 md:px-10 h-full justify-center ">
          <h2 className="text-center font-bold text-3xl tracking-tight mb-10">
            Member Login
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <InputField
                control={form.control}
                name="phone_number"
                label="Phone number"
                icon={<User size={20} className="text-zinc-600" />}
                type="text"
              />
              <InputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />

              <Button type="submit" variant="secondary">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Link href="/sign-up" className="flex w-full justify-end p-2">
        <Button className=" flex gap-2 md:w-1/2 w-full group" variant="link">
          Create your account <MoveRight className="text-zinc-600" />
        </Button>
      </Link>
      <CursorProvider />
    </div>
  );
};

export default Page;
