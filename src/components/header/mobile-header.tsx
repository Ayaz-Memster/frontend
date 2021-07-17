import React from 'react';
import { SearchIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { atom, useAtom } from 'jotai';
import { MobileSearchBar } from './mobile-search-bar';

const showSearchAtom = atom(false);

export const MobileHeader = () => {
  const [showSearch, setShowSearch] = useAtom(showSearchAtom);

  const toggleShowSearch = () => {
    setShowSearch((s) => !s);
  };

  return (
    <>
      <div className="flex md:hidden justify-between">
        <h1 className="text-xl font-semibold">Ayaz-Memster</h1>
        <div className="flex gap-1 items-center text-gray-400">
          <span className="text-lg">150/150</span>
          <button
            onClick={toggleShowSearch}
            className="rounded-full focus:outline-none focus:ring"
          >
            <SearchIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {showSearch && <MobileSearchBar onClose={toggleShowSearch} />}
      <button className="fixed bottom-2 right-2 p-2 shadow-md rounded-full focus:outline-none focus:ring z-10 bg-white md:hidden">
        <PlusCircleIcon className="w-8 h-8 text-green-400" />
      </button>
    </>
  );
};
