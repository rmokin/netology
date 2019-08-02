import React from 'react';
import {MyMessage,Response, Typing} from './Message';

export default class MessageHistory extends React.Component {
   constructor(props){
       super(props);
   }

   render(){
       return this.props.list 
       ? (
            <ul>
                {
                    this.props.list.map((item, index) => {
                        return (
                            item.type === "message" 
                                ? <MyMessage {...item} index={index} key={item.id}/>
                                : item.type === "response"
                                    ?  <Response {...item} index={index} key={item.id}/> 
                                    : item.type === "typing"
                                        ? <Typing {...item} index={index} key={item.id}/> 
                                        : null
        
                        );
                    })
                }
            </ul>
            
         ) 
       : null;
   }
}

MessageHistory.defaultProps = {
  list: [],
}