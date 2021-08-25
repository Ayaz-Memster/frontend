import 'react-image-crop/dist/ReactCrop.css';
import React from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { AddModalForm } from './add-modal-form';

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
            <button>
              <XIcon className="w-6 h-6" onClick={props.onClose} />
            </button>
          </div>
          <AddModalForm />
        </div>
      </div>
    </Dialog>
  );
};

export { AddModal as default };
