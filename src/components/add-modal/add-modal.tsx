import React from 'react';
import { Dialog } from '@headlessui/react';

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
    >
      <div className="min-h-screen grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-25 z-0" />
        <div className="flex flex-col p-3 bg-white shadow-md rounded-xl z-10">
          <Dialog.Title className="text-xl font-bold">Add image</Dialog.Title>
          <form className="flex flex-col items-center gap-2">
            <div className="w-full relative pt-6">
              <input
                type="text"
                className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
                placeholder="Title"
              />
              <label
                htmlFor="title"
                className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
              >
                Title
              </label>
            </div>
            <div className="flex items-end gap-1">
              <div className="relative pt-6">
                <input
                  type="text"
                  className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
                  placeholder="Link"
                />
                <label
                  htmlFor="link"
                  className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
                >
                  Link
                </label>
              </div>
              <span className="text-lg p-2">or</span>
              <button className="rounded-md bg-gray-400 p-2 text-lg">
                Choose
              </button>
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-400 p-2 text-lg w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
