import React, { useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/header/header';
import { ImagesList } from './components/images-list/images-list';
import { ImagesProvider } from './hooks/useImages';

const queryClient = new QueryClient();
function App() {
  const updateVhVariable = useCallback(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    updateVhVariable();
    document.addEventListener('resize', updateVhVariable);
    return () => {
      document.removeEventListener('resize', updateVhVariable);
    };
  }, []);

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
}

export default App;
