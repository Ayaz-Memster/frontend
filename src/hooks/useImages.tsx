import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { useQuery } from 'react-query';

interface Image {
  id: string;
  uploadDateTime: string;
}

type Images = Image[];

interface ImagesState {
  data: Images;
  isLoading: boolean;
  error?: string;
}

interface Query {
  query: string;
  setQuery: (value: string) => void;
}

const ImagesContext = createContext<ImagesState | undefined>(undefined);
const QueryContext = createContext<Query | undefined>(undefined);

const getImages = async (query: string): Promise<Images> => {
  try {
    const images = await fetch(`https://localhost:9000/images?query=${query}`, {
      method: 'GET',
    }).then((res) => res.json());
    return images;
  } catch (err) {
    console.error(err);
    // throw new Error('Cannot get images');
    return [];
  }
};

export const ImagesProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useQuery('images', () => getImages(''));

  return (
    <ImagesContext.Provider value={{ data: data ?? [], isLoading }}>
      <QueryContext.Provider value={{ query: query, setQuery }}>
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
