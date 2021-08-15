import { Dialog } from '@headlessui/react';
import { DownloadIcon, XIcon } from '@heroicons/react/outline';
import { Dayjs } from 'dayjs';
import React, { MouseEventHandler, useCallback } from 'react';

export interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  link: string;
  uploadDateTime: Dayjs;
}

export const ZoomModal = ({
  isOpen,
  onClose,
  title,
  link,
  uploadDateTime,
}: ZoomModalProps) => {
  const download: MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const response = await fetch(link, {
        method: 'GET',
      });
      const buffer = await response.arrayBuffer();
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const element = document.createElement('a');
      element.href = url;
      element.download = `${title}.jpg`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    [link, title]
  );

  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div className="min-h-screen-calc grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-90 lg:bg-opacity-25" />
        <div className="w-[98%] lg:w-auto h-[98%] md:h-auto relative flex flex-col p-5 bg-transparent lg:bg-white shadow-md rounded-xl z-10 text-white lg:text-black justify-start gap-2">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-3xl md:text-xl font-bold">
              {title}
            </Dialog.Title>
            <button
              className="rounded-full focus:outline-none focus:ring"
              onClick={onClose}
            >
              <XIcon className="w-8 md:w-6 h-8 md:h-6" />
            </button>
          </div>
          <img
            src={link}
            alt={title}
            className="w-full lg:min-h-[600px] lg:min-w-[600px] max-h-[90vh] object-contain"
          />
          <div className="w-full flex justify-between items-center text-xl md:text-lg">
            <span>{uploadDateTime.format('HH:mm DD.MM.YYYY')}</span>
            <a
              href={link}
              onClick={download}
              download={`${title}.webp`}
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

export { ZoomModal as default };
