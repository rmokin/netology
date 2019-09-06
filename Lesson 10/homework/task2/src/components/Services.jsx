import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import {Link} from 'react-router-dom';
import {fetchServicesThunk, fetchServiceDeleteThunk } from '../actions/actionCreators';
import {Loading} from '../components/Loading';


function Services(props){

    const {
        items = [], 
        isLoading, 
        deleting = {},
    } = useSelector(state => state.services);
    const [needRefresh, setNeedRefresh] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    //const [mustRefresh, setMustRefresh] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect( () => {
        if (needRefresh && mustRefresh(needRefresh, deleting) || !isLoaded){
            setNeedRefresh(false);
            setIsLoaded(true);
            dispatch(fetchServicesThunk());
        }
        return () => {};
    },[needRefresh, deleting,isLoaded]);

    const handleDelete = (serviceId) => {
        setNeedRefresh(true);
        dispatch(fetchServiceDeleteThunk(serviceId));
    };

    const mustRefresh = (needRefresh, deleting) => {
        let canRefresh = needRefresh;
        for (let serviceId in deleting){
            if (deleting[serviceId] === true){
                canRefresh &= false;
                break;
            }
        }
        return canRefresh;
    }
    /*
    if (needRefresh){
        let canRefresh = needRefresh;
        for (let serviceId in deleting){
            if (deleting[serviceId] === true){
                canRefresh &= false;
                break;
            }
        }
        if (canRefresh !== mustRefresh){
            //setMustRefresh(canRefresh);
        }
        
    }
    */

    return (
        (isLoading && <Loading isLoading />) || 
        (
            <ul>
            {
                
                items.map( (item) => {
                    return (
                        <li key={item.id}>
                            <span className="item-text">{item.name}</span>
                            :
                            <span className="item-price">{item.price}</span>
                            <div className="item-actions">
                                <Link to={`/services/${item.id}`}>Edit</Link>
                                <button disabled={deleting[item.id] === true} onClick={ (e) => { e.preventDefault(); handleDelete(item.id); } }>Delete</button>
                            </div>
                        </li>
                    )
                } )
            }
            </ul>
        )
    );

}

const mapStateToProps = (state,ownProps) => {
    const {services: {items, isLoading, hasError}} = state;
    return {...ownProps, items, isLoading, hasError};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Services);
export {ConnectedComponent as Services};

