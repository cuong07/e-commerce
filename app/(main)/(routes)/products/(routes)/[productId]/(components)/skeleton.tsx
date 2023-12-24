import React from 'react';

const Skeleton = () => {
    return (
        <div className=" flex flex-col gap-8 container">
            <div className="flex md:gap-8 gap-2">
                <section className="flex flex-col gap-4 md:w-[36vw]  md:min-w-[36vw]">
                    <div className="mt-2 w-full h-[600px] animate-pulse rounded-lg bg-gray-300" />
                    <ul className="flex justify-between gap-2 h-[100px]">
                        {new Array(4).fill(0).map((_, index) => (
                            <li key={index} className="w-1/4 rounded-md bg-gray-300 animate-pulse h-full" />
                        ))}
                    </ul>
                </section>
                <section className="flex gap-8 flex-col flex-1">
                    <div className="mt-2 w-[60%] h-5 animate-pulse rounded-md bg-gray-300" />
                    <div className="mt-2 w-[70%] h-6 animate-pulse rounded-md bg-gray-300" />
                    <div className="mt-2 w-[20%] h-6 animate-pulse rounded-md bg-gray-300" />
                    <div className="mt-6 w-[40%] h-8 animate-pulse rounded-md bg-gray-300" />
                    <div className="mt-12 w-[50%] h-10 animate-pulse rounded-md bg-gray-300" />
                    <div className="flex flex-col gap-2">
                        <div className="w-[80%] h-4 animate-pulse rounded-md bg-gray-300" />
                        <div className="w-[90%] h-4 animate-pulse rounded-md bg-gray-300" />
                        <div className="w-[90%] h-4 animate-pulse rounded-md bg-gray-300" />
                        <div className="w-[90%] h-4 animate-pulse rounded-md bg-gray-300" />
                    </div>
                </section>
            </div>
            <div></div>
        </div>
    );
};

export default Skeleton;
