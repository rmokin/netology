import React from 'react';
import MessageHistory from './components/MessageHistory';
import {messages} from './data/messages';
import './App.css';
import './main.css';

function App() {
  return (
    <div className="chat">
      <div className="chat-history">
        <MessageHistory list={messages}/>
      </div>
    </div>
    
  );
}

export default App;
