import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { fetcher } from '../../lib/apiUrl';
import { Input } from '../input/input';
import { Error as ResponseError } from '../../contract/error';
import { Loader } from '../loader/loader';
import { useLoginModal } from './useLoginModal';
import { useUser } from '../../hooks/useUser';

interface RegisterData {
  username: string;
  password: string;
  repeatPassword: string;
}

const login = async (
  data: Pick<RegisterData, 'username' | 'password'>
): Promise<void> => {
  try {
    await fetcher.post('/user/register', data);
    throw { response: { data: { message: 'Now wait for acceptance)' } } };
  } catch (err) {
    const { response } = err as AxiosError<ResponseError>;
    console.error(response?.data);
    throw new Error(response?.data.message);
  }
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>({ mode: 'onBlur' });
  const { closeModal } = useLoginModal();
  const { refetch } = useUser();
  const { mutate, isLoading, isError, error } = useMutation<
    void,
    Error,
    RegisterData
  >(login, {
    onSuccess: () => {
      refetch();
      closeModal();
    },
  });

  const onSubmit = (data: RegisterData) => {
    mutate(data);
  };

  const password = watch('password');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-2 relative w-96"
    >
      <Input
        label="Username"
        placeholder="Username"
        {...register('username', {
          required: {
            message: 'Username is required',
            value: true,
          },
          minLength: {
            value: 6,
            message: 'Username is too short',
          },
        })}
        error={errors.username?.message}
      />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        {...register('password', {
          required: {
            message: 'Password is required',
            value: true,
          },
        })}
        error={errors.password?.message}
      />
      <Input
        label="Repeat password"
        placeholder="Repeat password"
        type="password"
        {...register('repeatPassword', {
          required: {
            message: 'Repeat password',
            value: true,
          },
          validate: {
            passwordsEqual: (value) => {
              if (value !== password) {
                return 'Passwords are not equal';
              }
              return true;
            },
          },
        })}
        error={errors.repeatPassword?.message}
      />
      <button
        type="submit"
        className="rounded-md bg-blue-400 p-2 text-lg w-full disabled:bg-blue-300 disabled:cursor-wait focus:outline-none focus:ring"
      >
        Login
      </button>
      {isLoading && (
        <Loader className="absolute -inset-2 backdrop-blur-sm top-0 grid place-items-center" />
      )}
      {isError && <p className="text-lg text-red-500">{error?.message}</p>}
    </form>
  );
};

export { RegisterForm as default };
