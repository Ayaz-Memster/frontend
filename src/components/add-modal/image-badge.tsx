import { XIcon } from '@heroicons/react/outline';
import React from 'react';

export interface ImageBadgeProps {
  text: string;
  onClick: () => void;
}

export const ImageBadge = ({ onClick, text }: ImageBadgeProps) => {
  return (
    <div className="p-2 bg-gray-300 rounded-md flex justify-between w-full max-w-[50vh]">
      <span className="truncate text-lg">{text}</span>
      <button
        type="button"
        className="focus:outline-none focus:ring rounded-full"
        onClick={onClick}
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
