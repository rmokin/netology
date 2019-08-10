import React from 'react';
export default function ItemList(props){

    const {items = Array.isArray(props.children) ? props.children : [props.children], position = 'vertical', className = ''} = props;

    return (
        items.map((item,index) => {
            return (
                <div {...item.props} 
                    className={
                        ` ${className} ` + 
                        (
                            (position === 'vertical' && ' item-block ') || 
                            (position === 'horizontal' && ' item-inline ') ||
                            ''
                        ) + 
                        (item.className || '')} >
                    {item}
                </div>
            )
            
        })
    );

}