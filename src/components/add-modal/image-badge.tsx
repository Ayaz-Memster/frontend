import { XIcon, PhotographIcon, LinkIcon } from '@heroicons/react/outline';
import React from 'react';

export interface ImageBadgeProps {
  type: 'link' | 'file';
  text: string;
  onClick: () => void;
}

export const ImageBadge = ({ onClick, text, type }: ImageBadgeProps) => {
  return (
    <div className="p-2 border rounded-md flex items-center justify-between w-full max-w-[50vh] gap-1">
      <div>
        {type === 'file' ? (
          <PhotographIcon className="h-5 w-5" />
        ) : (
          <LinkIcon className="h-5 w-5" />
        )}
      </div>
      <span className="truncate text-lg flex-grow">{text}</span>
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
