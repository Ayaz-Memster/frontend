import React, { ComponentPropsWithRef, forwardRef } from 'react';

export type InputProps = ComponentPropsWithRef<'input'> & {
  error?: string;
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, label, name, ...props },
  ref
) {
  return (
    <div className="w-full relative pt-6">
      <input
        type="text"
        className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
        name={name}
        ref={ref}
        {...props}
      />
      {label && (
        <label
          htmlFor={name}
          className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
        >
          {label}
        </label>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
});
