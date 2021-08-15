import React from 'react';

export const SkeletonImage = () => {
  return (
    <article className="flex flex-col items-center animate-pulse gap-1">
      <div className="w-[300px] h-[300px] bg-gray-300"></div>
      <div className="text-2xl text-center text-transparent bg-gray-300">
        Loading
      </div>
    </article>
  );
};
