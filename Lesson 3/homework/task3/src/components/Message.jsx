import React from 'react';
import '../main.css';

function BaseMessage(props){
    const {type, index, time, from, text} = props;
    return (
        <li className={index === 0 ? "clearfix" : ""}>
            <div className="message-data align-right">
                <span className="message-data-time">{time}</span>
                &nbsp; &nbsp;
                <span className="message-data-name">{from.name}</span>
                {
                    (
                        type === "typing"
                        ?   <i className="fa fa-circle me"></i>
                        :   null
                    )
                }
            </div>
            <div 
                className=
                {
                    "message float-right " + 
                    (
                        type === "message"
                        ? "my-message"
                        : "other-message"
                    )
                }>
                    {
                        (
                            type === "typing"
                            ?   "печатает..."
                            :   text
                        )
                    }
            </div>
        </li>
    );
}

export function MyMessage(props){
    return <BaseMessage {...props} type="message"/>
}

export function Response(props){
    return <BaseMessage {...props} type="response"/>
}

export function Typing(props){
    return <BaseMessage {...props} type="typing"/>
}

