import React from 'react';
import { useUser } from '../../../hooks/useUser';

export const LoginButton = () => {
  const { data, error, isError, isLoading } = useUser();

  if (isLoading) {
    return (
      <p className="text-lg animate-pulse rounded-md cursor-wait">Username</p>
    );
  }
  if (isError || !data) {
    if (error?.statusCode === 401) {
      return (
        <button className="text-lg focus:outline-none focus:ring rounded-md">
          Log In
        </button>
      );
    }
    return <p className="text-lg text-red-500">Error</p>;
  }
  return (
    <div>
      <p>{data?.username}</p>
      <button className="text-lg focus:outline-none focus:ring rounded-md">
        Log out
      </button>
    </div>
  );
};
