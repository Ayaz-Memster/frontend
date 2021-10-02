import React from 'react';
import { AddButton } from './add-button';
import { LoginButton } from './login-button';
import { SearchBar } from './search-bar';
import { Title } from './title';

export const DesktopHeader = () => {
  return (
    <div className="w-full hidden md:flex justify-between items-center relative">
      <Title />
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center gap-2">
        <AddButton />
        <SearchBar />
      </div>
      <div>
        <LoginButton />
      </div>
    </div>
  );
};
