import { DownloadIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import React, { MouseEventHandler } from 'react';
import { Image } from '../../contract/image';
import { apiUrl } from '../../lib/apiUrl';
import { downloadImage } from '../../lib/downloadImage';

export interface ZoomImageProps {
  image: Image;
}

export const ZoomImage = ({ image }: ZoomImageProps) => {
  const download: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    downloadImage(image.name);
  };

  return (
    <div className="grid grid-rows-footer-content w-full">
      <div className="flex flex-col items-stretch">
        <img
          src={`${apiUrl}/${image.name}`}
          alt={image.name}
          className="object-contain lg:h-[85vh]"
        />
      </div>
      <div className="w-full flex justify-between items-center text-xl md:text-lg">
        <span>{dayjs(image.uploadDateTime).format('HH:mm DD.MM.YYYY')}</span>
        <a
          href={`${apiUrl}/download/${image.name}`}
          onClick={download}
          className="focus:opacity-100 focus:outline-none focus:ring rounded-full"
        >
          <DownloadIcon className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
};
