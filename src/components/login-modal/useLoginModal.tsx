import React, { lazy, Suspense, useContext } from 'react';
import { createContext, PropsWithChildren, useState } from 'react';

const LoginModal = lazy(() => import('./login-modal'));

type LoginModalContext = {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const LoginModalContext = createContext<LoginModalContext | undefined>(
  undefined
);

export const LoginModalProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <LoginModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      <Suspense fallback={null}>
        <LoginModal isOpen={showModal} onClose={closeModal} />
      </Suspense>
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error('useAddModal must be within provider');
  }
  return context;
};
