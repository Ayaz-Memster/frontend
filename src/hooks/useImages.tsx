import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { RequestError } from '../contract/error';
import { Images } from '../contract/image';

interface ImagesState {
  data: Images;
  isLoading: boolean;
  error?: string;
}

interface Query {
  query: string;
  setQuery: (value: string) => void;
  total: number;
  current: number;
}

const ImagesContext = createContext<ImagesState | undefined>(undefined);
const QueryContext = createContext<Query | undefined>(undefined);

const getImages = async (query: string): Promise<Images> => {
  const res = await fetch(`https://localhost:9000/images?id=${query}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const error = (await res.json()) as RequestError;
    console.error(error);
    throw new Error(error.title);
  }

  const images = await res.json();
  return images;
};

export const ImagesProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useQuery('images/' + query, () =>
    getImages(query)
  );
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isLoading || error || !data) {
      return;
    }
    if (query.length === 0) {
      setTotal(data.length);
    }
    setCurrent(data.length);
  }, [data, isLoading, error, query]);

  return (
    <ImagesContext.Provider
      value={{
        data: data ?? [],
        isLoading,
        error: error instanceof Error ? error.message : undefined,
      }}
    >
      <QueryContext.Provider value={{ query: query, setQuery, total, current }}>
        {children}
      </QueryContext.Provider>
    </ImagesContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImagesContext);
  if (context === undefined) {
    throw new Error('useImages must be within provider');
  }
  return context;
};

export const useSearch = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useSearch must be within provider');
  }
  return context;
};
