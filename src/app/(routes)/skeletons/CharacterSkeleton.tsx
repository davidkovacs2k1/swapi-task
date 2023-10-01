"use client"

import React from "react";

const PAGE_MAX_LENGTH = 10;

const CharacterSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-5 gap-4 mt-8">
            {Array.from({ length: PAGE_MAX_LENGTH }).map((_, index: number) => {
                return <div key={index} className="skeleton col-span-1 w-full aspect-square rounded-xl"></div>;
            })}
        </div>
    );
};

export default CharacterSkeleton;
