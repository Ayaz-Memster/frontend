import { PlusCircleIcon } from '@heroicons/react/outline';
import React from 'react';
import { useAddModal } from '../useAddModal';

export const AddButton = () => {
  const { openModal } = useAddModal();

  return (
    <button
      className="hidden md:block focus:outline-none focus:ring rounded-full"
      onClick={openModal}
      aria-label="Open add modal"
    >
      <PlusCircleIcon className="w-6 h-6 text-green-500" />
    </button>
  );
};
