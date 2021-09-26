import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';
import { Control, useController } from 'react-hook-form';
import type { FormData } from './add-modal-form';

export interface FileInputProps {
  control: Control<FormData>;
}

export const FileInput = ({ control }: FileInputProps) => {
  const {
    field,
    formState: {
      errors: { file },
    },
  } = useController({
    control,
    name: 'file',
    defaultValue: null,
    rules: { required: { message: 'File is not selected', value: true } },
  });

  const { getRootProps, getInputProps, isDragActive, rootRef } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => {
      field.onChange(files[0] ?? null);
    },
  });

  field.ref(rootRef.current);

  const onPaste = useCallback(
    (e: ClipboardEvent) => {
      const image = e.clipboardData?.files.item(0);
      if (!image) {
        return;
      }
      field.onChange(image);
    },
    [field.onChange]
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
            'grid flex-grow h-16 place-items-center border-dashed border focus:outline-none focus:ring',
            isDragActive && 'bg-gray-100 border-gray-400'
          ),
        })}
      >
        <input {...getInputProps({ name: field.name, onBlur: field.onBlur })} />
        <span className="hidden md:block">
          Click, drag'n'drop or paste file here
        </span>
        <span className="block md:hidden">Tap to add file</span>
      </div>
      {file?.message && <span className="text-red-500">{file.message}</span>}
    </div>
  );
};
