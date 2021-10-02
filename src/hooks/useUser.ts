import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { User } from '../contract/user';
import { fetcher } from '../lib/apiUrl';
import { Error as ResponseError } from '../contract/error';

const fetchUser = async (): Promise<User> => {
  try {
    return await fetcher.get<User>('/user').then((res) => res.data);
  } catch (err) {
    const { response } = err as AxiosError<ResponseError>;
    console.error(response?.data);
    throw response?.data;
  }
};

export const useUser = () => {
  const { data, isLoading, isError, error } = useQuery<User, ResponseError>(
    'user',
    fetchUser,
    {
      retry: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isError, error };
};
