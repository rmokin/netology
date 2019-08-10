import React from 'react';
import '../App.css';

export function NavBar(props){

    
    let items = props.items || props.children;
    items = Array.isArray(items) ? items : [items];
    const {activeIndex} = props;
    

    return ( 
        items.map((item,index) => { 
            return (
                <a  key={index}
                    href={item.props.href === false ? '' : (item.props.href || "")}
                    className={ 
                        ((props.className && ` ${props.className} `) || '' ) + 
                        ((item.props.className && ` ${item.props.className} `) || '') + 
                        ((activeIndex===index && " active ") || "")}
                    onClick={(!item.props.href && props.onClick) ? ((e) => {
                        e.preventDefault();
                        (item.props.href !== false) && props.onClick(index);
                    }) : undefined }>
                    {item.props.name || item}
                </a>
            );
        })
    )

}