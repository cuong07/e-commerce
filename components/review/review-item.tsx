import { ReviewData } from '@/type';
import React from 'react';
import { Avatar } from '../ui/avatar';
import Image from 'next/image';
import moment from 'moment';
import { RatingStar } from '../rating/rating-star';
import { Button } from '../ui/button';
import useAuthStore from '@/hooks/use-auth-store';
import { Edit, Reply } from 'lucide-react';

// import userNoImage from '@/assets/user.png';

export const ReviewItem = ({ review }: { review: ReviewData }) => {
    const noImage: string = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    const { currentUser } = useAuthStore();
    return (
        <div>
            <div className="flex gap-4">
                <Image
                    width={48}
                    height={48}
                    className="rounded-full border-[2px] p-[2px] border-green-500"
                    src={noImage}
                    alt={review.user.fullName}
                />
                <div className="flex flex-col justify-start">
                    <h2 className="font-semibold text-xl tracking-tighter">{review.user.fullName}</h2>
                    <p className="text-xs font-semibold text-zinc-500">{moment(review.createdAt).format('llll')}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center  gap-2">
                    <span className="text-sm font-medium">{review.rating}</span>
                    <RatingStar rate={review.rating} />
                </div>
                <article className="text-base mt-1 text-zinc-700 min-h-[72px]">
                    “ {review.content.substring(0, 150)}”
                </article>
                <ul className="flex  text-sm font-semibold">
                    <li className="px-2 gap-1 flex items-center cursor-pointer hover:text-zinc-500">
                        <Reply size={16} />
                        reply
                    </li>
                    {currentUser && currentUser.id === review.user.id && (
                        <li className="px-2 gap-1 flex items-center cursor-pointer hover:text-zinc-500">
                            <Edit size={16} />
                            edit
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
