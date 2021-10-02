import React, { lazy, memo, Suspense } from 'react';
import { QueryParamProvider } from 'use-query-params';
import { useImages } from '../../hooks/useImages';
import { Image } from './image';
import { SkeletonImage } from './skeleton-image';
import { ZoomModalProvider } from './useZoomModal';

const ErrorMessage = lazy(() => import('../error-message/error-message'));

export const ImagesList = () => {
  const { data, isLoading, error } = useImages();

  if (error) {
    return (
      <Suspense fallback={null}>
        <ErrorMessage title={error} />
      </Suspense>
    );
  }

  return (
    <QueryParamProvider>
      <ZoomModalProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:px-15 2xl:px-0 3xl:grid-cols-6 pt-6 gap-5 overflow-y-auto items-start">
          {!isLoading ? (
            data.map((item) => <Image key={item.name} image={item} />)
          ) : (
            <LoadingList />
          )}
        </div>
      </ZoomModalProvider>
    </QueryParamProvider>
  );
};

const LoadingList = memo(() => (
  <>
    {Array.from(Array(10), (_, i) => (
      <SkeletonImage key={i} />
    ))}
  </>
));

export { ImagesList as default };
