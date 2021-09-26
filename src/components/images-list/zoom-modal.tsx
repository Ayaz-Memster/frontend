import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { lazy, Suspense } from 'react';
import { Image } from '../../contract/image';
import { Loader } from '../loader/loader';

const ZoomImage = lazy(() => import('./zoom-image'));

export type ZoomModalProps = {
  onClose: () => void;
  image: Image | null;
};

export const ZoomModal = ({ onClose, image }: ZoomModalProps) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={image !== null}
      onClose={onClose}
    >
      <div className="h-full grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-90 lg:bg-opacity-25" />
        <div className="max-h-screen-calc h-full w-full lg:w-auto lg:h-auto relative p-5 bg-transparent lg:bg-white shadow-md rounded-xl z-10 text-white lg:text-black gap-2 grid grid-rows-header-content">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-3xl lg:text-xl font-bold">
              {image?.name}
            </Dialog.Title>
            <button
              className="rounded-full focus:outline-none focus:ring"
              onClick={onClose}
            >
              <XIcon className="w-8 md:w-6 h-8 md:h-6" />
            </button>
          </div>
          <Suspense
            fallback={<Loader className="grid place-items-center w-96 h-96" />}
          >
            <ZoomImage image={image!} />
          </Suspense>
        </div>
      </div>
    </Dialog>
  );
};

export default ZoomModal;
