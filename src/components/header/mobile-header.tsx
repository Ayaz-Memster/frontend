import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { atom, useAtom } from 'jotai';
import { MobileSearchBar } from './mobile-search-bar';
import { AddButton } from './add-button';

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
        <div className="flex gap-2 items-center text-gray-400">
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
      <AddButton isMobile />
    </>
  );
};
