import React, {
  createContext,
  lazy,
  PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { Image } from '../../contract/image';
import { apiUrl } from '../../lib/apiUrl';

const ZoomModal = lazy(() => import('./zoom-modal'));

const ZoomModalContext = createContext<
  | {
      openModal: (image: Image) => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);

async function getImage(name: string): Promise<Image> {
  const res = await fetch(`${apiUrl}/image/${name}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const error = (await res.json()) as Error;
    console.error(error);
    throw new Error(error.message);
  }

  const image = await res.json();
  return image;
}

export const ZoomModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [image, setImage] = useState<Image | null>(null);
  const [queryName, setQueryName] = useQueryParam('zoom', StringParam);

  useEffect(() => {
    if (!queryName) {
      return;
    }
    getImage(queryName).then((image) => setImage(image));
  }, []);

  const openModal = (image: Image) => {
    setImage(image);
    setQueryName(image.name, 'replaceIn');
  };
  const closeModal = () => {
    setImage(null);
    setQueryName(undefined, 'replaceIn');
  };

  return (
    <ZoomModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Suspense fallback={null}>
        <ZoomModal onClose={closeModal} image={image} />
      </Suspense>
    </ZoomModalContext.Provider>
  );
};

export const useZoomModal = () => {
  const context = useContext(ZoomModalContext);
  if (!context) {
    throw new Error('useZoomModal must be within provider');
  }
  return context;
};
