import React from 'react';
import './App.css';
import {AddEdit} from './components/AddEdit';
import {List} from './components/List';
import {useSelector} from'react-redux';

function App() {

  return (
    <>
      <AddEdit />
      <List />
    </>
  );
}

export default App;
