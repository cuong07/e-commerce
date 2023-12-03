import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface IInputSearch {
  handleSubmit: (value: string) => void;
}
export const InputSearch = ({ handleSubmit }: IInputSearch) => {
  const [keyword, setKetword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKetword(e.target.value);
  };

  const onSubmit = () => {
    handleSubmit(keyword);
  };
  return (
    <div className="h-12 rounded-lg mx-4">
      <form className="w-full h-full relative flex items-center">
        <Input
          className="rounded-xl focus:ring-0"
          placeholder="Search name, category..."
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute right-4 bg-transparent "
          onClick={onSubmit}
        >
          <Search
            size={20}
            className="dark:text-zinc-200 text-zinc-600 bg-none"
          />
        </button>
      </form>
    </div>
  );
};
