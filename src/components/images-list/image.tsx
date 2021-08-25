import React, { useCallback } from 'react';
import { ZoomInIcon } from '@heroicons/react/outline';
import { Dayjs } from 'dayjs';
import { useZoomModal } from './useZoomModal';
import { apiUrl } from '../../apiUrl';

export interface ImageProps {
  title: string;
  uploadDateTime: Dayjs;
}

export const Image = ({ title, uploadDateTime }: ImageProps) => {
  const { openModal } = useZoomModal();
  const link = `${apiUrl}/images/${title}`;
  const previewLink = link + '/preview';

  const openZoomModal = useCallback(() => {
    openModal({
      title,
      link,
      uploadDateTime,
    });
  }, [title, link, uploadDateTime]);

  return (
    <div className="grid place-items-center">
      <article className="w-full first-letter:grid grid-flow-row items-center">
        <figure className="w-full grid place-items-center gap-1">
          <div className="w-full sm:w-[300px] sm:h-[300px] overflow-hidden flex items-center justify-center relative">
            <img
              width="300"
              loading="lazy"
              height="300"
              className="hover:cursor-zoom-in object-cover max-w-none w-[95%] sm:w-auto"
              src={previewLink}
              onClick={openZoomModal}
              alt={`Picture of Ayaz called '${title}'`}
            />
            <button
              className="opacity-0 bg-white p-1 absolute top-2 right-2 focus:opacity-100 focus:outline-none focus:ring rounded-full"
              onClick={openZoomModal}
              aria-label={`Zoom ${title} image`}
            >
              <ZoomInIcon className="w-7 h-7" />
            </button>
          </div>
          <figcaption className="text-2xl text-center">{title}</figcaption>
        </figure>
      </article>
    </div>
  );
};
