import React from 'react';
import shortid from 'shortid';
import Item from './Item';
import '../main.css';

export default class Listing extends React.Component {
   constructor(props){
       super(props);
   }

   

   render(){
       return (
            <div className="item-list"> 
                {
                    (this.props.items).map( (data, index) => {
                        return data.listing_id && data.quantity 
                            ? <Item key={ data.listing_id || shortid.generate() } {...data} /> 
                            : null;
                    })
                }
            </div>
       );
   }
}

Listing.defaultProps = {
  items: [],
}