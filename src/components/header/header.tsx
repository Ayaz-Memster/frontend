import React from 'react';
import { DesktopHeader } from './desktop/desktop-header';
import { MobileHeader } from './mobile-header';
import { AddModalProvider } from './useAddModal';

export const Header = () => {
  return (
    <AddModalProvider>
      <header className="w-full shadow-md p-2 relative">
        <DesktopHeader />
        <MobileHeader />
      </header>
    </AddModalProvider>
  );
};
