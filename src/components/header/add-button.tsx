import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';

export const AddButton = () => {
  return (
    <button className="focus:outline-none focus:ring rounded-full">
      <PlusCircleIcon className="w-6 h-6 text-green-500" />
    </button>
  );
};
