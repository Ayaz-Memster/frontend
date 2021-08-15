import React, { useCallback, useMemo, useState, lazy, Suspense } from 'react';
import { ZoomInIcon } from '@heroicons/react/outline';
import dayjs, { Dayjs } from 'dayjs';

const ZoomModal = lazy(() => import('./zoom-modal'));

export interface ImageProps {
  title: string;
  link: string;
  uploadDateTime: Dayjs;
}

export const Image = ({ link, title, uploadDateTime }: ImageProps) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const openZoomModal = useCallback(() => setIsZoomOpen(true), []);
  const closeZoomModal = useCallback(() => setIsZoomOpen(false), []);

  return (
    <>
      <div className="grid place-items-center">
        <article className="w-full first-letter:grid grid-flow-row items-center">
          <figure className="w-full grid place-items-center">
            <div className="w-full sm:w-[300px] sm:h-[300px] overflow-hidden flex items-center justify-center relative">
              <img
                src={link + '/preview'}
                width="300"
                loading="lazy"
                height="300"
                alt={`Picture of Ayaz called '${title}'`}
                className="hover:cursor-zoom-in object-cover max-w-none w-[95%] sm:w-auto"
                onClick={openZoomModal}
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
      <Suspense fallback={null}>
        <ZoomModal
          isOpen={isZoomOpen}
          onClose={closeZoomModal}
          link={link}
          title={title}
          createDate={uploadDateTime}
        />
      </Suspense>
    </>
  );
};
