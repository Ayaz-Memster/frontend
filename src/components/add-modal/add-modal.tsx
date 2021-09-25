import 'react-image-crop/dist/ReactCrop.css';
import React, { lazy, Suspense } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Loader } from '../loader/loader';

const AddModalForm = lazy(() => import('./add-modal-form'));

export interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddModal = (props: AddModalProps) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={props.isOpen}
      onClose={props.onClose}
      unmount
    >
      <div className="min-h-screen grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-25 z-0" />
        <div className="w-[95%] sm:w-auto relative flex flex-col p-5 bg-white shadow-md rounded-xl z-10">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">Add image</Dialog.Title>
            <button className="rounded-full focus:outline-none focus:ring">
              <XIcon className="w-6 h-6" onClick={props.onClose} />
            </button>
          </div>
          <Suspense
            fallback={
              <div className="sm:min-w-[50vh] h-60">
                <Loader />
              </div>
            }
          >
            <AddModalForm />
          </Suspense>
        </div>
      </div>
    </Dialog>
  );
};
