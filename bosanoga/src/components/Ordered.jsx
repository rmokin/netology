import React from 'react';
import Section from './Section';
import {connect, useSelector,useDispatch} from'react-redux';
import {clearToCart, postOrderClear} from '../actions/actionCreators';

export default function Ordered(props){

    const {
        isOrdered,
        
    } = useSelector(state => state.order);
    const dispatch = useDispatch();
    
    React.useEffect( () => {
        if (isOrdered){
            dispatch(clearToCart());
            dispatch(postOrderClear());
        }
        return () => {};
    },[isOrdered]);


    return (
        <Section {...props} className="ordered" template={import(`../assets/html/${isOrdered ? 'Ordered.html' : 'NotOrderedYet.html'}`)} />
    );

}