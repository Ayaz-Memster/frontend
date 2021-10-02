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

interface LoginData {
  username: string;
  password: string;
}

const login = async (data: LoginData) => {
  try {
    await fetcher.post('/user/login', data);
  } catch (err) {
    const { response } = err as AxiosError<ResponseError>;
    console.error(response?.data);
    throw new Error(response?.data.message);
  }
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onBlur',
  });
  const { closeModal } = useLoginModal();
  const { refetch } = useUser();
  const { mutate, isLoading, isError, error } = useMutation<
    void,
    ResponseError,
    LoginData
  >(login, {
    onSuccess: () => {
      refetch();
      closeModal();
    },
  });

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

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

export { LoginForm as default };
