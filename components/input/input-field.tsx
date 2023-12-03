import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IInputField {
  control: any;
  name: string;
  icon?: React.ReactNode;
  type: string;
  label: string;
}

export const InputField: React.FC<IInputField> = ({
  control,
  name,
  icon,
  type,
  label,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-col gap-2">
              <FormLabel className="text-sm font-light">{label}</FormLabel>
              <div className="flex relative items-center w-full">
                <Input
                  type={
                    type === "password"
                      ? isShow === true
                        ? "text"
                        : "password"
                      : "text"
                  }
                  {...field}
                />
                <div
                  className="absolute right-2 bg-white cursor-pointer"
                  onClick={handleToggle}
                >
                  {type === "password" ? (
                    isShow ? (
                      <Eye size={20} className="text-zinc-600" />
                    ) : (
                      <EyeOff size={20} className="text-zinc-600" />
                    )
                  ) : (
                    icon
                  )}
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
