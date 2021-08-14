import React, { useCallback, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Switch } from '../switch/switch';
import ReactCrop, { Crop } from 'react-image-crop';
import cx from 'classnames';
import 'react-image-crop/dist/ReactCrop.css';
import { FileInput } from './file-input';
import { LinkInput } from './link-input';
import { ImageBadge } from './image-badge';
import { validateImage } from 'image-validator';

export interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  link?: string;
  file?: File | null;
  crop: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export const AddModal = (props: AddModalProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [isFile, setIsFile] = useState(false);

  const setFile = useCallback((file: File | null) => {
    setValue('file', file);
  }, []);
  const removeFile = useCallback(() => {
    setValue('file', null);
  }, []);
  const setLink = useCallback(async (link: string) => {
    const isImage = await validateImage(link);
    if (!isImage) {
      setError('link', { message: 'Image to link is not valid' });
      return;
    } else {
      clearErrors('link');
    }
    setValue('link', link);
  }, []);
  const removeLink = useCallback(() => {
    setValue('link', undefined);
  }, []);
  const [crop, setCrop] = useState<Crop>({ aspect: 1, unit: 'px', width: 300 });

  const submitHandler: SubmitHandler<FormData> = useCallback(
    async (data) => {
      const formData = new FormData();
      if (!isFile) {
        if (!data.link) {
          setError(
            'link',
            { message: 'Link is not provided' },
            { shouldFocus: true }
          );
          return;
        }
        const isImage = await validateImage(data.link);
        if (!isImage) {
          setError(
            'link',
            { message: 'Image to link is not valid' },
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
      formData.append('title', data.title);
      formData.append('x', data.crop.x!.toString());
      formData.append('y', data.crop.y!.toString());
      formData.append('width', data.crop.width!.toString());
      formData.append('height', data.crop.height!.toString());
    },
    [isFile]
  );

  const [link, file] = watch(['link', 'file']);
  const [img, setImg] = useState<string>();

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setImg(reader.result as string));
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (
      crop.x === undefined ||
      crop.y === undefined ||
      crop.height === undefined ||
      crop.width === undefined ||
      crop.width === 0 ||
      crop.height === 0
    ) {
      setError('crop', { message: 'Preview crop is not set' });
      return;
    }
    clearErrors('crop');
    setValue('crop', {
      x: crop.x,
      y: crop.y,
      height: crop.height,
      width: crop.width,
    });
  }, [crop]);

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
                !file ? (
                  <FileInput
                    onChange={setFile}
                    error={errors.file ? errors.file.message : undefined}
                  />
                ) : (
                  <>
                    <ReactCrop src={img!} crop={crop} onChange={setCrop} />
                    {errors.crop && (
                      <span className="text-red-500">
                        {
                          // @ts-ignore
                          errors.crop.message
                        }
                      </span>
                    )}
                    <ImageBadge text={file!.name} onClick={removeFile} />
                  </>
                )
              ) : !link || errors.link ? (
                <LinkInput
                  value={link}
                  onChange={setLink}
                  error={errors.link ? errors.link.message : undefined}
                />
              ) : (
                <>
                  <ReactCrop src={link!} crop={crop} onChange={setCrop} />
                  {errors.crop && (
                    <span className="text-red-500">
                      {
                        // @ts-ignore
                        errors.crop.message
                      }
                    </span>
                  )}
                  <ImageBadge text={link!} onClick={removeLink} />
                </>
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
