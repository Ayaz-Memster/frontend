import React, { lazy, Suspense, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';

const AddModal = lazy(() => import('../add-modal/add-modal'));

export const AddButton = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        className="focus:outline-none focus:ring rounded-full"
        onClick={openModal}
      >
        <PlusCircleIcon className="w-6 h-6 text-green-500" />
      </button>
      <Suspense fallback={null}>
        <AddModal isOpen={showModal} onClose={closeModal} />
      </Suspense>
    </>
  );
};
