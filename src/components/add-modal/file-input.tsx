import React, { useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';

export interface FileInputProps {
  onChange: (file: File | null) => void;
  error?: string;
}

export const FileInput = ({ onChange, error }: FileInputProps) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
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

  const onPaste = useCallback(
    (e: ClipboardEvent) => {
      const image = e.clipboardData?.files.item(0);
      if (!image) {
        return;
      }
      onChange(image);
    },
    [onChange]
  );

  useEffect(() => {
    document.addEventListener('paste', onPaste);
    return () => {
      document.removeEventListener('paste', onPaste);
    };
  }, [onPaste]);

  return (
    <div className="flex flex-col w-full">
      <div
        {...getRootProps({
          className: cx(
            'hidden lg:grid flex-grow h-16 place-items-center border-dashed border focus:outline-none focus:ring',
            isDragActive && 'bg-gray-100 border-gray-400'
          ),
        })}
      >
        <input {...getInputProps()} />
        <span>Click, drag'n'drop or paste file here</span>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
