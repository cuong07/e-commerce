"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { ProductData } from "@/type";
import { debounce } from "lodash";
import { getProducts } from "@/lib/api/products";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDebounce } from "use-debounce";
import { Suggestions } from "../suggestions";
import { useRouter } from "next/navigation";
import useProductStore from "@/hooks/use-product-store";

interface IInputSearchProps {
  handleSearch: (keyword: string) => void;
}

export const InputSearch = ({ handleSearch }: IInputSearchProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [value] = useDebounce(keyword, 300);
  const [results, setResults] = useState<ProductData[]>([]);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (value.trim() !== "") {
        try {
          const response = await getProducts({
            page: 0,
            limit: 10,
            keyword: value,
          });
          setResults(response.data.products);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setResults([]);
      }
    };
    fetchData();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFoucs = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsOpenPopup(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpenPopup(false);
    }, 150);
  };

  const handleSumit = () => {
    router.push("/products?name=" + keyword);
    handleSearch(keyword);
  };

  const handleClick = (productId: number, name: string) => {
    setKeyword(name);
    router.push("/products/" + productId);
  };

  return (
    <div className="h-12 rounded-lg mx-4 w-full z-50 ">
      <div className="flex items-center space-x-2 w-full mb-1">
        <Input
          placeholder="Search name product..."
          onChange={handleChange}
          value={keyword}
          onFocus={handleFoucs}
          onBlur={handleBlur}
        />
        <Button className="flex gap-2" onClick={handleSumit}>
          <Search size={20} className="" />
          Search
        </Button>
      </div>
      {isOpenPopup && (
        <Suggestions
          results={results}
          handleClick={handleClick}
          keyword={keyword}
        />
      )}
    </div>
  );
};
