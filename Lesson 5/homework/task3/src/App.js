import React from 'react';
import {Collapse} from './components/Collapse';
import {Paragraph} from './components/Paragraph';
import './App.css';

function App() {
  return (
    <Collapse 
      expondedLable="Дануна &#8963;"
      collapsedLable="Чётам &#8964;">
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
        non proident, sunt in culpa qui officia deserunt mollit 
        anim id est laborum.
      </Paragraph>
    </Collapse>
  );
}

export default App;
