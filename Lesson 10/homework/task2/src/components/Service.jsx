import React from 'react';
import {connect, useSelector, useDispatch} from'react-redux';
import { Redirect} from "react-router-dom"; 
import {fetchServiceThunk, changeServiceField, fetchServiceSaveThunk, fetchServicesThunk, fetchServiceSaveInit} from '../actions/actionCreators';
import { NotFound } from '../components/NotFound';

function Service(props){
    
    const [isCanceled, setCanceled] = React.useState(false);
    
    const {match: {params: {id: serviceId } } } = props;
    const {
        service:{
            item: {id, name = '', price = '', content = ''}, 
            isLoading, 
            hasError,
            wasSaved
        },
        services: {items = []}
    } = useSelector(state => state);
    const dispatch = useDispatch();
    const notFound = (items.filter( (o) => { return o.id === serviceId } ).length <= 0);


    const handleChange = (e) => {
        const {name,value} = e.target;
        dispatch(changeServiceField(name,value));
    }

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(fetchServiceSaveThunk(serviceId, name, price, content));
    }

    React.useEffect( () => {
        if (items.length <= 0){
            dispatch(fetchServicesThunk());    
        }
        dispatch(fetchServiceThunk(serviceId));
        return () => {};
    },[]);

    if (wasSaved){
        dispatch(fetchServiceSaveInit());
    }
    
    return (
        ( !isLoading && !id && items.length > 0 && notFound && <NotFound/> ) || 
        ( (isCanceled || wasSaved) && !hasError && <Redirect to="/services" /> ) || (
            <div className="item">
                <div className="item-field-control">
                    <label>Name</label>
                    <input name="name" value={name} disabled={isLoading} type="text" onChange={ handleChange }/>
                </div>
                <div className="item-field-control">
                    <label>Price</label>
                    <input name="price" value={price} disabled={isLoading} type="number" onChange={ handleChange }/>
                </div>
                <div className="item-field-control">
                    <label>Context</label>
                    <textarea name="context" value={content} disabled={isLoading} onChange={ handleChange }></textarea>
                </div>
                <div className="controls">
                    <button onClick={ handleSave } disabled={isLoading} >Save</button>
                    <button onClick={ (e) => {e.preventDefault(); setCanceled(true);} } >Cancel</button>
                </div>
            </div>
        )
    );
}

const mapStateToProps = (state, ownProps) => {
    const {service: {item, isLoading, hasError}} = state;
    return {...ownProps, item, isLoading, hasError};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Service);
export {ConnectedComponent as Service};

