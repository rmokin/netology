import React from 'react';
import {useSelector,useDispatch} from'react-redux';
import {clearServiceField, removeService, selectService} from'../actions/actionCreators';
import '../App.css';

export function List(props){

    const {items} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();
    
    const handleRemove = id => { dispatch(removeService(id)); }
    const handleSelect = id => {  dispatch(selectService(id)); }
    
    return (
        items.map(function (item){
            return (
                <div key={item.id} className="item">
                    <span className="caption">{item.name}</span>
                    <span className="price">{item.price}</span>
                    <a className="link-button" onClick={ (e) => { e.preventDefault(); handleSelect(item.id) } } >Edit</a>
                    <a className="link-button" onClick={ (e) => { e.preventDefault(); handleRemove(item.id) } }>Delete</a>
                </div>
            );
        })
    );

}