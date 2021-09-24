import { Dialog } from '@headlessui/react';
import { DownloadIcon, XIcon } from '@heroicons/react/outline';
import { Dayjs } from 'dayjs';
import React, { MouseEventHandler, useCallback } from 'react';
import { downloadImage } from '../../lib/downloadImage';

export interface ImageInfo {
  title: string;
  link: string;
  uploadDateTime: Dayjs;
}

export interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageInfo | null;
}

export const ZoomModal = ({ isOpen, onClose, image }: ZoomModalProps) => {
  const download: MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!image) {
        return;
      }
      const { link, title, extension } = image;
      downloadImage({
        link,
        title,
        extension,
      });
    },
    [image]
  );

  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div
        className="h-full p-5 grid place-items-center"
        style={{ gridTemplateRows: 'minmax(0,1fr)' }}
      >
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-90 lg:bg-opacity-25" />
        <div
          className="max-h-full md:h-auto relative lg:p-5 bg-transparent lg:bg-white shadow-md rounded-xl z-10 text-white lg:text-black justify-start gap-2 grid"
          style={{
            gridTemplateRows: 'auto minmax(0, 1fr) auto',
          }}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-3xl lg:text-xl font-bold">
              {image?.title}
            </Dialog.Title>
            <button
              className="rounded-full focus:outline-none focus:ring"
              onClick={onClose}
            >
              <XIcon className="w-8 md:w-6 h-8 md:h-6" />
            </button>
          </div>
          <div className="flex flex-col items-center w-full">
            <img
              src={image?.link}
              alt={image?.title}
              className="max-w-full lg:min-w-[600px] object-contain max-h-full"
            />
          </div>
          <div className="w-full flex justify-between items-center text-xl md:text-lg">
            <span>{image?.uploadDateTime.format('HH:mm DD.MM.YYYY')}</span>
            <a
              href={image?.link}
              onClick={download}
              className="focus:opacity-100 focus:outline-none focus:ring rounded-full"
            >
              <DownloadIcon className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ZoomModal;
