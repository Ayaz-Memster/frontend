import React, { useCallback, useEffect } from 'react';
import { Header } from './components/header/header';
import { ImagesList } from './components/images-list/images-list';

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
    <div className="h-screen-calc grid grid-rows-header-content">
      <Header />
      <ImagesList />
    </div>
  );
}

export default App;
