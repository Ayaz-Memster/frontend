import React, {
  createContext,
  lazy,
  PropsWithChildren,
  Suspense,
  useContext,
  useState,
} from 'react';
import { Image } from '../../contract/image';

const ZoomModal = lazy(() => import('./zoom-modal'));

const ZoomModalContext = createContext<
  | {
      openModal: (image: Image) => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);

export const ZoomModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [image, setImage] = useState<Image | null>(null);

  const openModal = (image: Image) => {
    setImage(image);
  };
  const closeModal = () => {
    setImage(null);
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
