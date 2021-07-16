import React from 'react';
import { Image } from './image';

export const ImagesList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mx-20 mt-6 gap-5 overflow-y-auto">
      {Array.from(new Array(15), (_, i) => (
        <Image key={i} />
      ))}
    </div>
  );
};
