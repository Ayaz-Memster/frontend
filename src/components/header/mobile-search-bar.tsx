import React from 'react';
import { ChevronUpIcon, XIcon } from '@heroicons/react/outline';
import { useSearch } from '../../hooks/useImages';

export interface MobileSearchBarProps {
  onClose: () => void;
}

export const MobileSearchBar = (props: MobileSearchBarProps) => {
  const { query, setQuery } = useSearch();

  return (
    <div className="flex gap-2 absolute top-full bg-white p-2 left-0 right-0 shadow-md z-10 md:hidden">
      <div className="grid place-items-center">
        <button
          className="text-gray-400 rounded-full focus:outline-none focus:ring"
          onClick={props.onClose}
        >
          <ChevronUpIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="border rounded-md flex-grow relative">
        <input
          placeholder="Search"
          autoFocus
          className="w-full h-full rounded-md p-1 focus:outline-none focus:ring text-2xl pr-6"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 rounded-full focus:outline-none focus:ring">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
