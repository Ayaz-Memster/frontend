import React, { lazy, Suspense, useContext } from 'react';
import { createContext, PropsWithChildren, useState } from 'react';
import { AddModal } from '../add-modal/add-modal';

type AddModalContext = {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AddModalContext = createContext<AddModalContext | undefined>(undefined);

export const AddModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AddModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      <Suspense fallback={null}>
        <AddModal isOpen={showModal} onClose={closeModal} />
      </Suspense>
    </AddModalContext.Provider>
  );
};

export const useAddModal = () => {
  const context = useContext(AddModalContext);
  if (context === undefined) {
    throw new Error('useAddModal must be within provider');
  }
  return context;
};
