import React from 'react';
import './App.css';

import {useSelector, useDispatch} from'react-redux';
import {changeSearchField} from'./actions/actionCreators'

function App() {

  const {items, isLoading, hasError, search} = useSelector( state => state.search);
  const dispatch = useDispatch();
  const handleSearch = e => {
    const {value} = e.target;
    dispatch(changeSearchField(value));
  };
  
  const hasQuery = search.trim() !== ''; 
  return(
    <>
      <div>
        <input type="search" value={search} onChange={handleSearch} placeholder={'Type some thing to search...'}/>
      </div>
      {
        hasQuery && isLoading && <div>searching...</div>
      }
      {
        hasError 
        ? <div>Error...</div>
        : <ul>
          {
            items.map(o => <li key={o.id}>{o.name}</li>)
          }
          </ul>
      }
    </>
  );

}

export default App;
