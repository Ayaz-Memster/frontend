import { AxiosError } from 'axios';
import React from 'react';
import { useUser } from '../../../hooks/useUser';
import { fetcher } from '../../../lib/apiUrl';
import { useLoginModal } from '../../login-modal/useLoginModal';
import { Error as ResponseError } from '../../../contract/error';
import { LogoutIcon } from '@heroicons/react/outline';

export const LoginButton = () => {
  const { data, error, isError, isLoading } = useUser();
  const { openModal } = useLoginModal();

  const logout = async () => {
    try {
      await fetcher.get('/user/logout');
      window.location.reload();
    } catch (err) {
      const { response } = err as AxiosError<ResponseError>;
      console.error(response?.data);
      throw new Error(response?.data.message);
    }
  };

  if (isLoading) {
    return (
      <p className="text-lg animate-pulse rounded-md cursor-wait">Username</p>
    );
  }
  if (isError || !data) {
    if (error?.statusCode === 401) {
      return (
        <button
          className="text-lg focus:outline-none focus:ring rounded-md p-1 bg-green-400"
          onClick={openModal}
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
      >
        <LogoutIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
