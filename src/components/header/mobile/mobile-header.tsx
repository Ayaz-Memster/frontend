import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { MobileSearchBar } from './mobile-search-bar';
import { AddButton } from './add-button';
import { Title } from './title';
import { useSearch } from '../../../hooks/useImages';
import { LoginButton } from './login-button';

export const MobileHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { current, total } = useSearch();

  const toggleShowSearch = () => setShowSearch((s) => !s);

  return (
    <>
      <div className="flex md:hidden justify-between items-center">
        <LoginButton />
        <Title />
        <div className="flex gap-2 items-center text-gray-400">
          <span className="text-lg">{`${current}/${total}`}</span>
          <button
            onClick={toggleShowSearch}
            className="rounded-full focus:outline-none focus:ring p-1"
          >
            <SearchIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
      {showSearch && <MobileSearchBar onClose={toggleShowSearch} />}
      <AddButton />
    </>
  );
};
