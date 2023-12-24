import { ProductData } from '@/type';
import Image from 'next/image';
import React from 'react';

interface SuggestionsProps {
    results: ProductData[];
    keyword: string;
    handleClick: (productId: number, name: string) => void;
}

export const Suggestions = ({ handleClick, results, keyword }: SuggestionsProps) => {
    const highlightMatch = (text: string, keyword: string) => {
        const index = text.toLowerCase().indexOf(keyword.toLowerCase());
        if (index !== -1) {
            return (
                <>
                    {text.substring(0, index)}
                    <span className="text-blue-500">{text.substring(index, index + keyword.length)}</span>
                    {text.substring(index + keyword.length)}
                </>
            );
        } else {
            return text;
        }
    };
    if (results.length === 0) {
        return (
            <ul className="bg-white text-black p-2 rounded-md shadow-md absolute w-full mt-2">
                <li>Enter the product name you want to search</li>
            </ul>
        );
    }

    return (
        <ul className="bg-white text-black p-2 mt-2 rounded-md shadow-md absolute w-full ">
            {results.length > 0 &&
                results.map((product: ProductData) => (
                    <li
                        key={product.id}
                        onClick={() => handleClick(product.id, product.name)}
                        className="cursor-pointer hover:bg-zinc-200 transition-all p-1 h-12 flex justify-between rounded-md"
                    >
                        <div>
                            <div>{highlightMatch(product.name, keyword)}</div>
                            <p className="text-sm font-semibold text-zinc-600">${product.price}</p>
                        </div>
                        <div className="h-full overflow-hidden w-12 relative">
                            <Image
                                src={process.env.NEXT_PUBLIC_BASE_URL + product.thumbnail}
                                alt={product.name}
                                className="object-cover hover:scale-110 scale-105 transition-all"
                                fill
                                sizes="100vw"
                            />
                        </div>
                    </li>
                ))}
        </ul>
    );
};
