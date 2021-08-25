import React from 'react';
import { AddButton } from './add-button';
import { LoginButton } from './login-button';
import { SearchBar } from './search-bar';
import { Title } from './title';

export const DesktopHeader = () => {
  return (
    <div className="w-full hidden md:flex justify-between items-center">
      <Title />
      <div className="items-center flex gap-2">
        <AddButton />
        <SearchBar />
      </div>
      <LoginButton />
    </div>
  );
};
