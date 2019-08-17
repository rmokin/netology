import React from 'react';
import classNames  from 'classnames';
import moment from 'moment';
import '../App.css';

export function SendMessage(props){
    const [message, setMessage] = React.useState('');
    return (
        <div className="new-message-area">
            <h5>New message</h5>
            <textarea rows={5} cols={32} value={message} onChange={ (e) => { setMessage(e.target.value); } }></textarea>
            <br/>
            <button disabled={!props.guid} onClick={(e)=>{
                const text = message;
                e.preventDefault();
                setMessage('');
                props.handleSend({
                    uid: props.guid,
                    content: text,
                });
            }}>Send</button>
        </div>
        
    );

}

export function Messages(props){

    return (
        <div className="message-container" >
            {
                props.messages.map((item) => {
                    return (
                        <Message key={item.id} {...item} isMine={item.uid === props.guid}/>
                    );
                })
            }
            
        </div>
    );

}

export function Message(props){

    return (
        <div className={classNames({
            "message": true,
            "my-message": props.isMine
        })}>
            <div className="message-data">
                <div className="message-author">
                    {
                        props.uid.substring(props.uid.length - 4)
                    }
                </div>
                <p className="message-content">
                    {
                        props.content
                    }
                </p>
                <div className="message-timestamp">
                    {
                        moment(props.date).format('YYYY-MM-DD hh:mm:ss')
                    }
                </div>
            </div>
            
        </div>
    );

} 