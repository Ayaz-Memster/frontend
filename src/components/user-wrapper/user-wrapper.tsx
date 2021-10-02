import React, { lazy, ReactNode, Suspense } from 'react';
import { useUser } from '../../hooks/useUser';
import { Loader } from '../loader/loader';

const ErrorMessage = lazy(() => import('../error-message/error-message'));

export interface UserWrapperProps {
  children: ReactNode;
}

export const UserWrapper = (props: UserWrapperProps) => {
  const { isLoading, isError, error } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Suspense fallback={<Loader />}>
        <ErrorMessage title={error?.message ?? 'Unknown error'} />
      </Suspense>
    );
  }

  return <>{props.children}</>;
};
