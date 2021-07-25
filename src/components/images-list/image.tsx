import React from 'react';
import { ZoomInIcon, DownloadIcon } from '@heroicons/react/outline';

export const Image = () => {
  return (
    <div className="grid place-items-center">
      <article className="group first-letter:grid grid-flow-row items-center relative">
        <figure>
          <img
            src={`http://placecorgi.com/${
              300 + Math.floor(Math.random() * 10)
            }/${300 + Math.floor(Math.random() * 10)}`}
            width="300"
            loading="lazy"
            height="300"
            alt="Corgi"
            className="hover:cursor-zoom-in"
          />
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
