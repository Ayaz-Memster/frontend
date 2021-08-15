import dayjs from 'dayjs';
import React from 'react';
import { useImages } from '../../hooks/useImages';
import { Image } from './image';

export const ImagesList = () => {
  const { data, isLoading, error } = useImages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:px-15 2xl:px-0 3xl:grid-cols-6 pt-6 gap-5 overflow-y-auto">
      {!isLoading ? (
        data.map((item) => (
          <Image
            key={item.id}
            title={item.id}
            link={`https://localhost:9000/images/${item.id}`}
            uploadDateTime={dayjs(item.uploadDateTime)}
          />
        ))
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};
