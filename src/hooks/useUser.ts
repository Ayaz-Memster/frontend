import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { User } from '../contract/user';
import { fetcher } from '../lib/apiUrl';
import { Error as ResponseError } from '../contract/error';
import { useCallback } from 'react';

const fetchUser = async (): Promise<User> => {
  try {
    return await fetcher.get<User>('/user').then((res) => res.data);
  } catch (err) {
    const { response } = err as AxiosError<ResponseError>;
    console.error(response?.data);
    throw response?.data;
  }
};

const fetchLogout = async () => {
  try {
    await fetcher.get('/user/logout');
  } catch (err) {
    const { response } = err as AxiosError<ResponseError>;
    console.error(response?.data);
    throw new Error(response?.data.message);
  }
};

export const useUser = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    User,
    ResponseError
  >('user', fetchUser, {
    retry: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const logout = useCallback(() => {
    fetchLogout().then(() => refetch());
  }, [refetch]);

  return { data, isLoading, isError, error, refetch, logout };
};
