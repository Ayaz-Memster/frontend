import React, { useState } from 'react';
import { Header } from './components/header/header';
import { ImagesList } from './components/images-list/images-list';

function App() {
  return (
    <div>
      <Header />
      <ImagesList />
    </div>
  );
}

export default App;
