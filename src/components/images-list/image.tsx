import React from 'react';
import { ZoomInIcon, DownloadIcon } from '@heroicons/react/outline';

export const Image = () => {
  return (
    <div className="grid place-items-center">
      <article className="group first-letter:grid grid-flow-row items-center relative">
        <figure>
          <div className="w-[300px] h-[300px] overflow-hidden flex items-center justify-center hover:overflow-visible">
            <img
              src={`http://placecorgi.com/${
                300 + Math.floor(Math.random() * 100)
              }/${300 + Math.floor(Math.random() * 100)}`}
              width="300"
              loading="lazy"
              height="300"
              alt="Corgi"
              className="hover:cursor-zoom-in object-contain max-w-none"
              onLoad={(event) => {
                const img = event.target as HTMLImageElement;
                const imgWidth = img.naturalWidth;
                const imgHeight = img.naturalHeight;
                if (imgWidth > imgHeight) {
                  const ratio = 300 / imgHeight;
                  const newWidth = imgWidth * ratio;
                  img.width = newWidth;
                  img.height = 300;
                } else {
                  const ratio = 300 / imgWidth;
                  const newHeight = imgHeight * ratio;
                  img.width = 300;
                  img.height = newHeight;
                }
              }}
            />
          </div>
          <figcaption className="text-2xl text-center">Corgi</figcaption>
        </figure>
        <button className="opacity-0 group-hover:opacity-100 absolute top-1 right-8 focus:opacity-100 focus:outline-none focus:ring rounded-full">
          <ZoomInIcon className="w-7 h-7" />
        </button>
        <button className="opacity-0 group-hover:opacity-100 absolute top-1 right-1 focus:opacity-100 focus:outline-none focus:ring rounded-full">
          <DownloadIcon className="w-7 h-7" />
        </button>
      </article>
    </div>
  );
};
