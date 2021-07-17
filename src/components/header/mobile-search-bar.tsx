import React from 'react';
import { ChevronUpIcon, XIcon } from '@heroicons/react/outline';

export interface MobileSearchBarProps {
  onClose: () => void;
}

export const MobileSearchBar = (props: MobileSearchBarProps) => {
  return (
    <div className="flex gap-1 absolute top-full bg-white z-10 p-1 left-0 right-0 shadow-md">
      <div className="grid place-items-center">
        <button
          className="text-gray-400 rounded-full focus:outline-none focus:ring"
          onClick={props.onClose}
        >
          <ChevronUpIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="border rounded-md flex-grow relative">
        <input
          placeholder="Search"
          className="w-full h-full rounded-md p-1 focus:outline-none focus:ring text-lg pr-6"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 rounded-full focus:outline-none focus:ring">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
