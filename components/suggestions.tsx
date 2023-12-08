import { ProductData } from "@/type";
import React from "react";

interface SuggestionsProps {
  results: ProductData[];
  keyword: string;
  handleClick: (productId: number, name: string) => void;
}

export const Suggestions = ({
  handleClick,
  results,
  keyword,
}: SuggestionsProps) => {
  const highlightMatch = (text: string, keyword: string) => {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase());
    if (index !== -1) {
      return (
        <>
          {text.substring(0, index)}
          <span className="text-blue-500">
            {text.substring(index, index + keyword.length)}
          </span>
          {text.substring(index + keyword.length)}
        </>
      );
    } else {
      return text;
    }
  };
  if (results.length === 0) {
    return (
      <ul className="bg-white text-black p-2 rounded-md shadow-md  mt-2">
        <li>Enter the product name you want to search</li>
      </ul>
    );
  }

  return (
    <ul className="bg-white text-black p-2 mt-2 rounded-md shadow-md ">
      {results.length > 0 &&
        results.map((product: ProductData) => (
          <li
            key={product.id}
            onClick={() => handleClick(product.id, product.name)}
            className="cursor-pointer hover:bg-zinc-200 transition-all p-1"
          >
            {highlightMatch(product.name, keyword)}
          </li>
        ))}
    </ul>
  );
};
