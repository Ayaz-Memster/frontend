import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Dayjs } from 'dayjs';
import React from 'react';

export interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  link: string;
  createDate: Dayjs;
}

export const ZoomModal = ({
  isOpen,
  onClose,
  title,
  link,
  createDate,
}: ZoomModalProps) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div className="min-h-screen grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-25 z-0" />
        <div className="relative flex flex-col p-5 bg-white shadow-md rounded-xl z-10">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            <button>
              <XIcon className="w-6 h-6" onClick={onClose} />
            </button>
          </div>
          <div>
            <img
              src={link}
              alt={title}
              className="lg:min-h-[600px] lg:min-w-[600px]"
            />
            <div className="w-full flex justify-between items-center text-lg">
              <span>{createDate.format('HH:MM')}</span>
              <span>{createDate.format('DD.MM.YYYY')}</span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
