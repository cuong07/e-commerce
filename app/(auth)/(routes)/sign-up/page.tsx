"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import signupImageSrc from "@/assets/undraw_Sign_up_n6im.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CalendarIcon, MoveRight, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { InputField } from "@/components/input/input-field";
import useAuthStore from "@/hooks/use-auth-store";
import { signup } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/hooks/use-modal-store";

const schema = z.object({
  fullname: z
    .string()
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
      "Name should contain only alphabets"
    )
    .refine(
      (value) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(value),
      "Please enter both firstname and lastname"
    ),
  phone_number: z
    .string()
    .refine(
      (value) => /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value),
      "Phone number is not valid"
    ),
  password: z.string().min(8),
  retype_password: z.string().min(8),
  date_of_birth: z.date({
    required_error: "A date of birth is required.",
  }),
  role_id: z.number(),
  address: z.string(),
  facebook_account_id: z.number(),
  google_account_id: z.number(),
});

type InitialState = {
  isShowPassword: boolean;
  isShowPasswordConfirm: boolean;
};

const Page = () => {
  const { register } = useAuthStore();
  const { onOpen } = useModalStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      fullname: "",
      password: "",
      retype_password: "",
      role_id: 2,
      address: "",
      facebook_account_id: 0,
      google_account_id: 0,
      date_of_birth: (new Date()),
      phone_number: "",
    },
    resolver: zodResolver(schema),
    reValidateMode: "onBlur",
    mode: "all",
  });

  const onSubmit = async (value: z.infer<typeof schema>) => {
    const response = await signup(value);
    onOpen("error", response.data);
    const { fullName, phoneNumber, id } = response.data;
    register(fullName, phoneNumber, id);
    router.push("/sign-in");
  };

  return (
    <div className="md:w-[70vw] md:h-[80vh] h-[68vh] w-[90vw] rounded-lg bg-white shadow-md flex flex-col ">
      <div className="flex flex-1 items-center">
        <div className="flex-1 hidden md:block">
          <h2 className="text-center text-4xl space-x-0 leading-tight tracking-tighter ">
            Welcome To CShop
          </h2>
          <article className="text-center font-thin">
            "Pioneering the modern shopping experience"
          </article>
          <Image src={signupImageSrc} alt="Login image" />
        </div>
        <div className="flex-1 flex flex-col md:px-10 mx-4 h-full justify-center ">
          <h2 className="text-center font-bold text-3xl tracking-tight md:mb-10 mb-2">
            Member Sign-In
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <InputField
                control={form.control}
                name="fullname"
                label="Full name"
                icon={<User size={20} className="text-zinc-600" />}
                type="text"
              />

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

              <InputField
                control={form.control}
                name="retype_password"
                label="Comfirm password"
                type="password"
              />

              {/* <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={field.onChange}
                          selected={field.value}
                          disabled={(date: any) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <Button
                type="submit"
                variant="secondary"
                className="md:mt-10 mt-4"
              >
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Link href="/sign-in" className="flex w-full justify-end p-2">
        <Button className=" flex gap-2 md:w-1/2 w-full group" variant="link">
          Your have account? <MoveRight className="text-zinc-600" />
        </Button>
      </Link>
    </div>
  );
};

export default Page;
