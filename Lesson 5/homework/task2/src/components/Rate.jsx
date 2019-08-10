import React from 'react';

export default function Rate(props){

    const {rate = 0.0, link = '#', text = '', delta = 0.0, className='rate'} = props;

    return (
        <span className={className} >
          <a href={link}>
          {text || props.children}
          </a>
          &nbsp;
          <span className="rate-value">{rate}</span>
          &nbsp;
          <span className="rate-deg">
            {
                ((delta > 0 && '+') || '') +
                delta
            }
          </span>
        </span>
    );

}