import React, {
  createContext,
  lazy,
  PropsWithChildren,
  Suspense,
  useContext,
  useState,
} from 'react';
import { ImageInfo } from './zoom-modal';

const ZoomModal = lazy(() => import('./zoom-modal'));

const ZoomModalContext = createContext<
  | {
      openModal: (image: ImageInfo) => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);

export const ZoomModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [image, setImage] = useState<ImageInfo | null>(null);

  const openModal = (image: ImageInfo) => {
    setImage(image);
  };
  const closeModal = () => {
    setImage(null);
  };

  return (
    <ZoomModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Suspense fallback={null}>
        <ZoomModal isOpen={image !== null} onClose={closeModal} image={image} />
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
