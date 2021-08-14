import React, { useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';

export interface FileInputProps {
  onChange: (file: File | null) => void;
  error?: string;
}

export const FileInput = ({ onChange, error }: FileInputProps) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    accept: 'image/*',
    onDrop: (files) => {
      onChange(files[0] ?? null);
    },
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (error) {
      buttonRef.current?.focus();
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-2">
        <div
          {...getRootProps({
            className: cx(
              'hidden lg:block h-16 flex-grow grid place-items-center border-dashed border focus:outline-none focus:ring',
              isDragActive && 'bg-gray-100'
            ),
          })}
        >
          <input {...getInputProps()} />
          <span>Drag 'n' drop file here</span>
        </div>
        <button
          type="button"
          onClick={open}
          className="rounded-md bg-gray-200 p-2 text-lg focus:outline-none focus:ring"
          ref={buttonRef}
        >
          Choose
        </button>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
