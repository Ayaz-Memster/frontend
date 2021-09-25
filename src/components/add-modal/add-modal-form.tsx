import { validateImage } from 'image-validator';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactCrop, { Crop } from 'react-image-crop';
import { apiUrl } from '../../lib/apiUrl';
import { FileInput } from './file-input';
import { ImageBadge } from './image-badge';
import { LinkInput } from './link-input';
import cx from 'classnames';
import { Switch } from '../switch/switch';
import { Input } from '../input/input';

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

const defaultCrop: Crop = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  aspect: 1,
  unit: '%',
};

export const AddModalForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const [status, setStatus] = useState<{
    type: 'unknown' | 'success' | 'fail' | 'loading';
    error?: string;
  }>({ type: 'unknown' });

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
    }
    clearErrors('link');
    setValue('link', link);
  }, []);
  const removeLink = useCallback(() => {
    setValue('link', undefined);
  }, []);
  const [crop, setCrop] = useState<Crop>(defaultCrop);
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>({
    height: 0,
    width: 0,
  });

  const [link, file] = watch(['link', 'file']);
  const [img, setImg] = useState<string>();

  useEffect(() => {
    if (!isFile) {
      if (!link) {
        setImg(undefined);
        return;
      }
      setImg(link);
      return;
    }
    if (!file) {
      setImg(undefined);
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImg(reader.result as string);
    });
    reader.readAsDataURL(file);
  }, [isFile, file, link]);

  useEffect(() => {
    setCrop(defaultCrop);
  }, [isFile]);

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
      x: Math.floor((crop.x * imgSize.width) / 100),
      y: Math.floor((crop.y * imgSize.height) / 100),
      height: Math.floor((crop.height * imgSize.height) / 100),
      width: Math.floor((crop.width * imgSize.width) / 100),
    });
  }, [crop, imgSize]);

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
      formData.append('name', data.title);
      formData.append('x', data.crop.x!.toString());
      formData.append('y', data.crop.y!.toString());
      formData.append('width', data.crop.width!.toString());
      formData.append('height', data.crop.height!.toString());
      try {
        setStatus({ type: 'loading' });
        const response = await fetch(`${apiUrl}/image`, {
          method: 'post',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(await response.text());
        }
        setStatus({ type: 'success' });
      } catch (err: any) {
        console.error(err);
        if (err instanceof Error) {
          setStatus({
            type: 'fail',
            error: err.message,
          });
        } else {
          setStatus({
            type: 'fail',
            error: 'Unknown error',
          });
        }
      }
    },
    [isFile]
  );

  return (
    <form
      className="flex flex-col items-center gap-2 w-full sm:min-w-[50vh]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="Title"
        placeholder="Title"
        {...register('title', {
          required: { value: true, message: 'Title is required' },
        })}
        error={errors.title?.message}
      />
      <div className="flex flex-col gap-3 w-full items-center">
        {isFile && !file && (
          <FileInput
            onChange={setFile}
            error={errors.file ? errors.file.message : undefined}
          />
        )}
        {!isFile && (
          <Input
            label="Link"
            placeholder="Link"
            {...register('link', {
              validate: {
                isImage: async (value) => {
                  if (!value) {
                    return 'Link is empty';
                  }
                  const isImage = await validateImage(value);
                  if (!isImage) {
                    return 'Link to image is not valid';
                  }
                  return;
                },
              },
            })}
            error={errors.link?.message}
          />
        )}
        {/* {((isFile && !!file) || (!isFile && link)) && (
          <>
            <ReactCrop
              src={img!}
              crop={crop}
              minWidth={50}
              minHeight={50}
              className=""
              imageStyle={{
                maxHeight: '50vh',
                maxWidth: '50vh',
              }}
              onImageLoaded={(img) => {
                setImgSize({
                  height: img.naturalHeight,
                  width: img.naturalWidth,
                });
              }}
              onChange={(_, c) => setCrop(c)}
            />
            {errors.crop && (
              <span className="text-red-500">
                {
                  // @ts-ignore
                  errors.crop.message
                }
              </span>
            )}
            <ImageBadge
              text={isFile ? file!.name : link!}
              onClick={isFile ? removeFile : removeLink}
            />
          </>
        )} */}
        <div className="flex gap-2 justify-center items-center my-4">
          <span className={cx('text-lg', !isFile && 'font-bold')}>Link</span>
          <Switch
            alt="Link or File switch"
            value={isFile}
            onChange={setIsFile}
          />
          <span className={cx('text-lg', isFile && 'font-bold')}>File</span>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-400 p-2 text-lg w-full disabled:bg-blue-300 disabled:cursor-wait focus:outline-none focus:ring"
        disabled={status.type === 'loading'}
      >
        {status.type === 'loading' ? 'Submitting...' : 'Submit'}
      </button>
      {status.type !== 'unknown' && status.type !== 'loading' && (
        <div>
          {status.type === 'success' && (
            <span className="text-green-500">Success</span>
          )}
          {status.type === 'fail' && (
            <span className="text-red-500">{status.error}</span>
          )}
        </div>
      )}
    </form>
  );
};

export default AddModalForm;
