import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Portal } from '@headlessui/react';
import { useAddModal } from '../useAddModal';

export const AddButton = () => {
  const { openModal } = useAddModal();

  return (
    <Portal>
      <button
        className="md:hidden absolute bottom-2 right-2 p-2 shadow-md rounded-full focus:outline-none focus:ring bg-white"
        onClick={openModal}
        type="button"
      >
        <PlusCircleIcon className="w-8 h-8 text-green-400" />
      </button>
    </Portal>
  );
};
