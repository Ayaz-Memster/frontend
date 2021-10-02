import { validateImage } from 'image-validator';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactCrop, { Crop } from 'react-image-crop';
import cx from 'classnames';
import { apiUrl, fetcher } from '../../lib/apiUrl';
import { FileInput } from './file-input';
import { ImageBadge } from './image-badge';
import { Switch } from '../switch/switch';
import { Input } from '../input/input';
import { Loader } from '../loader/loader';
import { StatusMessage } from './status-message';
import { AxiosError } from 'axios';

export interface FormData {
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
    control,
  } = useForm<FormData>({
    mode: 'all',
  });
  const [status, setStatus] = useState<{
    type: 'unknown' | 'success' | 'fail' | 'loading';
    error?: string;
  }>({ type: 'unknown' });
  const [fileCrop, setFileCrop] = useState<Crop>(defaultCrop);
  const [linkCrop, setLinkCrop] = useState<Crop>(defaultCrop);
  const [isFile, setIsFile] = useState(false);
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>({
    height: 0,
    width: 0,
  });
  const [img, setImg] = useState<string>();

  const crop = useMemo(
    () => (isFile ? fileCrop : linkCrop),
    [isFile, fileCrop, linkCrop]
  );
  const setCrop = useMemo(() => (isFile ? setFileCrop : setLinkCrop), [isFile]);

  const removeFile = () => {
    setValue('file', null);
  };
  const removeLink = () => {
    setValue('link', undefined);
  };

  const [link, file] = watch(['link', 'file']);

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
    if (
      crop.x === undefined ||
      crop.y === undefined ||
      !crop.width ||
      !crop.height
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
        formData.append('link', data.link!);
      } else {
        formData.append('file', data.file!);
      }
      formData.append('name', data.title);
      formData.append('x', data.crop.x!.toString());
      formData.append('y', data.crop.y!.toString());
      formData.append('width', data.crop.width!.toString());
      formData.append('height', data.crop.height!.toString());

      setStatus({ type: 'loading' });
      try {
        await fetcher.post(`/image`, formData);
        setStatus({ type: 'success' });
      } catch (err) {
        const { response } = err as AxiosError<Error>;
        console.error(response?.data);
        setStatus({ type: 'fail', error: response?.data.message });
      }
    },
    [isFile]
  );

  return (
    <form
      className="flex flex-col items-center gap-2 w-full sm:min-w-[50vh] relative"
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
        {isFile && !file && <FileInput control={control} />}
        {!isFile && (!link || errors.link) && (
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
        {((isFile && !!file && !errors.file) ||
          (!isFile && link && !errors.link)) && (
          <>
            <ReactCrop
              src={img!}
              crop={crop}
              minWidth={50}
              minHeight={50}
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
              type={isFile ? 'file' : 'link'}
              text={isFile ? file!.name : link!}
              onClick={isFile ? removeFile : removeLink}
            />
          </>
        )}
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
      {status.type === 'success' && <StatusMessage />}
      {status.type === 'fail' && <StatusMessage error={status.error} />}
      {status.type === 'loading' && (
        <Loader className="absolute -inset-2 backdrop-blur-sm top-0 grid place-items-center" />
      )}
    </form>
  );
};

export default AddModalForm;
