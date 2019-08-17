import React from 'react';
import {sayHello, listMessages, sendMessage} from './endpoints/Messages';
import {Messages,SendMessage} from './components/Messages';
import './App.css';
import { Secret } from './components/Secrect';

/*
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options
  };

  if (options.expires && options.expires.toUTCString) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
*/

class App extends React.Component{
  constructor(props){
    super(props);
    debugger;
    this.state = {
      messages: [],
      guid: '' ,
      from: '',
      timerId: -1,
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

  getGuidEndpoint = (secret) => {

    (secret) && (!this.state.guid) && sayHello( (data) => {
      this.setState({
        guid: data.token
      });
      //localStorage.setItem('guid', data.token);
    }, secret);

  }

  getMessagesEndpoint = (from) => {

    listMessages( (data) => {
      
      const countNewMessages = data.messages.length;
      const lastMessageId = (countNewMessages > 0 && data.messages[countNewMessages - 1].id) || '';
      if (countNewMessages > 0 && lastMessageId !== this.state.from){
        var msgs = [...this.state.messages, ...data.messages];
        this.setState({
          messages: msgs,
          from: lastMessageId, 
        });
        this.scrollToBottom();
      }
      
    }, from)

  }

  sendMessageEndpoint = (message) => {

    sendMessage( (data) => {
      debugger;
      this.getMessagesEndpoint(this.state.from);
    }, message );

  }

  handleSend = (message) => {
    this.sendMessageEndpoint(message);
  }

  startTimer = (delay) => {
    (this.state.timerId < 0 && this.setState({
      timerId: setInterval( (o) => { o.state.guid && o.getMessagesEndpoint(o.state.from);}, delay, this),
    }))
  }
  componentDidUpdate() {
    this.startTimer(1000);
  }

  componentWillUnmount(){

    (this.state.timerId > 0 && clearInterval(this.state.timerId) );

  }

  componentDidMount(){
    //this.getGuidEndpoint();
    //this.startTimer(1000);
  }

  render () {

    return (
      <div className="App">
        {
          this.state.guid 
          ? (

              <div className="Chat">
                <h5>Chat</h5>
                <Messages messages={this.state.messages} guid={this.state.guid} />
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <SendMessage guid={this.state.guid} handleSend={this.handleSend} />
              </div>
          )
          : (

            <Secret handleSecret={this.getGuidEndpoint} />

          )
        }
        
        
        
      </div>
    );

  }
}

export default App;
