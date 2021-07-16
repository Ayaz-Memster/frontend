import React from 'react';
import { DesktopHeader } from './desktop-header';
import { MobileHeader } from './mobile-header';

export const Header = () => {
  return (
    <header className="w-full shadow-md p-2 relative">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
};
