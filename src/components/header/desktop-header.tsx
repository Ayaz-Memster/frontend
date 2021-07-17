import React from 'react';
import { AddButton } from './add-button';
import { LoginButton } from './login-button';
import { SearchBar } from './search-bar';

export const DesktopHeader = () => {
  return (
    <div className="w-full hidden md:flex justify-between">
      <h1 className="text-xl font-semibold">Ayaz-Memster</h1>
      <div className="items-center flex gap-2">
        <AddButton />
        <SearchBar />
      </div>
      <LoginButton />
    </div>
  );
};
