import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { AddModal } from '../add-modal/add-modal';
import { atom, useAtom } from 'jotai';

const showModalAtom = atom(false);

export const AddButton = () => {
  const [showModal, setShowModal] = useAtom(showModalAtom);

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
      <AddModal isOpen={showModal} onClose={closeModal} />
    </>
  );
};
