import React from 'react';
import {Star} from './Star';

export function Stars(props){

    const {count} = props;
    
    return (
        Number.isInteger(count) && (count >= 1 && count <= 5) 
        ? <ul className="card-body-stars u-clearfix">
            {
                ((new Array(count)).fill(1)).map((value, index) => {
                    return <Star key={index} />;
                })
            }
        </ul>
        : null
    );

}