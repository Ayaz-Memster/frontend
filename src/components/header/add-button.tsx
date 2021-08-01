import React, { lazy, Suspense, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Portal } from '@headlessui/react';

const AddModal = lazy(() => import('../add-modal/add-modal'));

export interface AddButtonProps {
  isMobile: boolean;
}

export const AddButton = ({ isMobile }: AddButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {!isMobile ? (
        <button
          className="hidden md:block focus:outline-none focus:ring rounded-full"
          onClick={openModal}
        >
          <PlusCircleIcon className="w-6 h-6 text-green-500" />
        </button>
      ) : (
        <Portal>
          <button
            className="md:hidden absolute bottom-2 right-2 p-2 shadow-md rounded-full focus:outline-none focus:ring bg-white"
            onClick={openModal}
          >
            <PlusCircleIcon className="w-8 h-8 text-green-400" />
          </button>
        </Portal>
      )}
      <Suspense fallback={null}>
        <AddModal isOpen={showModal} onClose={closeModal} />
      </Suspense>
    </>
  );
};
