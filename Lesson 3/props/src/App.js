import React from 'react';
import logo from './logo.svg';
import './App.css';
import { generate } from 'shortid';

function App() {
  return (
    <div className="App">
      <TodoList list={ [1,2,3,4,5,6,7,8,9,10] }></TodoList>
    </div>
  );
}

/*
function Modal(props) {

  const modalClass = props.danger ? "danger" : "default";

  return (
    <div className=`main {modalClass}`>
      {prop.text}
    </div>
  );

}*/

function TodoList(props){

  const list = [1,2,3,4,5,6,7,8,9,10];
  for(let l in list){
    let v = list[l];
    list[l] = {
      value: v,
      id : generate() 
    } 
  }
  return (
    
    <ul>
    {
      list.map((value,i) => {
          return (
              <li key={value.id} id={value.id} >
                {value.value}
              </li>
          );
      })
    }
    </ul>
  );

}

export default App;
