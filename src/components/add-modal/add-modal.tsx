import React, { useCallback, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Switch } from '../switch/switch';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { Crop } from 'react-image-crop';
import cx from 'classnames';
import 'react-image-crop/dist/ReactCrop.css';

export interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  link?: string;
  file?: File | null;
}

export const AddModal = (props: AddModalProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    accept: 'image/*',
    onDrop: (files) => {
      setValue('file', files[0] ?? null);
    },
  });
  const [isFile, setIsFile] = useState(false);

  const removeFile = useCallback(() => {
    setValue('file', null);
  }, []);
  const [crop, setCrop] = useState<Crop>({ aspect: 1, unit: 'px', width: 300 });

  const submitHandler: SubmitHandler<FormData> = useCallback(
    (data) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('x', crop.x!.toString());
      formData.append('y', crop.y!.toString());
      formData.append('width', crop.width!.toString());
      formData.append('height', crop.height!.toString());
      if (!isFile) {
        if (!data.link) {
          setError(
            'link',
            { message: 'Link is not provided' },
            { shouldFocus: true }
          );
          return;
        }
        formData.append('link', data.link);
      } else {
        if (!data.file) {
          setError('file', { message: 'File is not provided' });
          return;
        }
        formData.append('file', data.file);
      }
      console.log(formData.get('file'));
    },
    [isFile, crop]
  );

  const file = watch('file');
  const [img, setImg] = useState<string>();

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setImg(reader.result as string));
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <div className="min-h-screen grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-25 z-0" />
        <div className="w-[95%] sm:w-auto relative flex flex-col p-5 bg-white shadow-md rounded-xl z-10">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">Add image</Dialog.Title>
            <button>
              <XIcon className="w-6 h-6" onClick={props.onClose} />
            </button>
          </div>
          <form
            className="flex flex-col items-center gap-2 w-full sm:w-96"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="w-full relative pt-6">
              <input
                type="text"
                className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
                placeholder="Title"
                {...register('title', {
                  required: { value: true, message: 'Title is required' },
                })}
              />
              <label
                htmlFor="title"
                className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
              >
                Title
              </label>
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              {isFile ? (
                <>
                  {!file ? (
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
                      >
                        Choose
                      </button>
                    </div>
                  ) : (
                    <div className="flex p-1 items-center">
                      {img && (
                        <ReactCrop src={img} crop={crop} onChange={setCrop} />
                      )}
                      <span className="truncate text-lg">{file.name}</span>
                      <button
                        type="button"
                        className="focus:outline-none focus:ring"
                        onClick={removeFile}
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  {errors.file && (
                    <span className="text-red-500">{errors.file.message}</span>
                  )}
                </>
              ) : (
                <div className="relative pt-6">
                  <input
                    type="text"
                    className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
                    placeholder="Link"
                    {...register('link')}
                  />
                  <label
                    htmlFor="link"
                    className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
                  >
                    Link
                  </label>
                  {errors.link && (
                    <span className="text-red-500">{errors.link.message}</span>
                  )}
                </div>
              )}
              <div className="flex gap-2 justify-center items-center my-4">
                <span className={cx('text-lg', !isFile && 'font-bold')}>
                  Link
                </span>
                <Switch
                  alt="Link or File switch"
                  value={isFile}
                  onChange={setIsFile}
                />
                <span className={cx('text-lg', isFile && 'font-bold')}>
                  File
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-400 p-2 text-lg w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export { AddModal as default };
