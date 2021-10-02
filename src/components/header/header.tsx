import React from 'react';
import { LoginModalProvider } from '../login-modal/useLoginModal';
import { DesktopHeader } from './desktop/desktop-header';
import { MobileHeader } from './mobile/mobile-header';
import { AddModalProvider } from './useAddModal';

export const Header = () => {
  return (
    <AddModalProvider>
      <LoginModalProvider>
        <header className="w-full shadow-md p-2 relative">
          <DesktopHeader />
          <MobileHeader />
        </header>
      </LoginModalProvider>
    </AddModalProvider>
  );
};
