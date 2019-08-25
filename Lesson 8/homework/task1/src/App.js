import React from 'react';
import {List} from './components/List';
import {Item} from './components/Item';
import './App.css';

function App() {

  const [state, setState] = React.useState({
    selected: null,
  });
  
  const handleClick = (id) => {
    setState({
      selected: id
    });
  };

  return (
    <div className="App">
      <List handleClick={handleClick} />
      <Item id={state.selected}/>
    </div>
  );
}

export default App;
