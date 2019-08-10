import React from 'react';
import '../App.css';

export function Paragraph(props){
    return (
        <p className="paragraph">
            {props.children}
        </p>
    );
    
}