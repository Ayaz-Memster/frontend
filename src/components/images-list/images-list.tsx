import React from 'react';
import { Image } from './image';

export const ImagesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:px-20 pt-6 gap-5 overflow-y-auto">
      {Array.from(new Array(15), (_, i) => (
        <Image key={i} />
      ))}
    </div>
  );
};
