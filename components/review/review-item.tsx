import { ReviewData } from '@/type';
import React from 'react';
import { Avatar } from '../ui/avatar';
import Image from 'next/image';
import moment from 'moment';
import { RatingStar } from '../rating/rating-star';
import { Button } from '../ui/button';
import useAuthStore from '@/hooks/use-auth-store';

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
                    className="rounded-full border-[2px] border-zinc-600"
                    src={noImage}
                    alt={review.user.fullName}
                />
                <div className="flex flex-col justify-start">
                    <h2 className="font-semibold text-xl tracking-tighter">{review.user.fullName}</h2>
                    <p className="text-xs font-semibold text-zinc-500">{moment(review.createdAt).format('llll')}</p>
                </div>
            </div>
            <div className="ml-16">
                <div>
                    <RatingStar rate={review.rating} />
                </div>
                <article className="text-base">{review.content}</article>
                <ul className="flex  text-sm font-semibold">
                    <li className="px-2">reply</li>
                    {currentUser && currentUser.id === review.user.id && <li className="px-2 ">edit</li>}
                </ul>
            </div>
        </div>
    );
};
