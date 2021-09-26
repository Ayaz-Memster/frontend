import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

export interface StatusMessageProps {
  error?: string;
}

export const StatusMessage = ({ error }: StatusMessageProps) => {
  if (error) {
    return (
      <span className="flex gap-1 items-center text-red-500 text-lg">
        <ExclamationCircleIcon className="w-5 h-5" />
        {error}
      </span>
    );
  }
  return (
    <span className="flex gap-1 items-center text-green-500 text-lg">
      <CheckCircleIcon className="w-5 h-5" />
      Success
    </span>
  );
};
