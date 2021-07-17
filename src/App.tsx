import React from 'react';
import { Header } from './components/header/header';
import { ImagesList } from './components/images-list/images-list';

function App() {
  return (
    <div className="h-screen grid grid-rows-header-content">
      <Header />
      <ImagesList />
    </div>
  );
}

export default App;
