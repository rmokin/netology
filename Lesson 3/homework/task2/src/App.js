import React from 'react';
import Listing from './components/Listing';
import items from './data/etsy.json';

import './App.css';

function App() {
  return (
    <Listing items={items} />
  );
}

export default App;
