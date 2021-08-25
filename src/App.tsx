import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/header/header';
import { ImagesList } from './components/images-list/images-list';
import { useChromeFix } from './hooks/useChromeFix';
import { ImagesProvider } from './hooks/useImages';

const queryClient = new QueryClient();

const App = () => {
  useChromeFix();
  return (
    <QueryClientProvider client={queryClient}>
      <ImagesProvider>
        <div className="h-screen-calc grid grid-rows-header-content">
          <Header />
          <ImagesList />
        </div>
      </ImagesProvider>
    </QueryClientProvider>
  );
};

export default App;
