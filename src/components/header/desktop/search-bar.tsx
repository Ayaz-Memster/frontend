import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useSearch } from '../../../hooks/useImages';

export const SearchBar = () => {
  const { query, setQuery } = useSearch();

  return (
    <div className="flex border rounded-md relative w-72">
      <input
        placeholder="Search"
        className="rounded-md p-1 w-full h-full focus:outline-none focus:ring pr-24 text-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="absolute right-7 text-gray-400 top-1/2 -translate-y-1/2">
        150/150
      </span>
      <SearchIcon className="w-5 h-5 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
};
