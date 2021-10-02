import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { UserWrapper } from './components/user-wrapper/user-wrapper';
import { useChromeFix } from './hooks/useChromeFix';
import { ImagesProvider } from './hooks/useImages';

const ImagesList = lazy(() => import('./components/images-list/images-list'));

const queryClient = new QueryClient();

const App = () => {
  useChromeFix();
  return (
    <QueryClientProvider client={queryClient}>
      <ImagesProvider>
        <div className="h-screen-calc grid grid-rows-header-content">
          <Header />
          <UserWrapper>
            <Suspense fallback={<Loader />}>
              <ImagesList />
            </Suspense>
          </UserWrapper>
        </div>
      </ImagesProvider>
    </QueryClientProvider>
  );
};

export default App;
