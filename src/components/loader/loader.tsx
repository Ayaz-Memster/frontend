import React, { ComponentPropsWithoutRef } from 'react';

export type LoaderProps = ComponentPropsWithoutRef<'div'>;

export const Loader = (props: LoaderProps) => {
  return (
    <div className="h-full w-full grid place-items-center" {...props}>
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 absolute left-0 top-0" />
        <div className="w-12 h-12 rounded-full border-t-2 animate-spin border-gray-500 absolute left-0 top-0" />
      </div>
    </div>
  );
};
