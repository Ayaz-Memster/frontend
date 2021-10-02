import React from 'react';
import { useUser } from '../../../hooks/useUser';
import { useLoginModal } from '../../login-modal/useLoginModal';
import { LogoutIcon } from '@heroicons/react/outline';

export const LoginButton = () => {
  const { data, error, isError, isLoading, logout } = useUser();
  const { openModal } = useLoginModal();

  if (isLoading) {
    return (
      <p className="text-lg animate-pulse cursor-wait bg-gray-200 text-transparent">
        Username
      </p>
    );
  }
  if (isError || !data) {
    if (error?.statusCode === 401) {
      return (
        <button
          className="text-lg focus:outline-none focus:ring rounded-md p-1 bg-green-400"
          onClick={openModal}
          type="button"
        >
          Log In
        </button>
      );
    }
    return <p className="text-lg text-red-500">Error</p>;
  }
  return (
    <div className="flex gap-2 items-center relative">
      <p className="text-lg">{data?.username}</p>
      <button
        className="rounded-md text-lg focus:outline-none focus:ring p-1 bg-red-500"
        onClick={logout}
        aria-label="Logout"
        type="button"
      >
        <LogoutIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
