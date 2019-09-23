import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import {loadMoreThunk} from '../actions/actionCreators';
import Preloader from './Preloader';
import Error from './Error';

function Loadmore(props){

    
    const {category:{id:categoryId}, search, offset, count = 6} = props;

    const {
        isLoading = false,
        hasError = null,
        noMore = false,
    } = useSelector(state => state.loadmore);

    const dispatch = useDispatch();

    React.useEffect( () => {
        return () => {};
    },[]);

    const loadmoreHandle = () => {
        dispatch(loadMoreThunk(categoryId, search, offset, count));
    };

    return (
        (isLoading && <Preloader />) || 
        (hasError && <Error message={hasError} handleRepeate={loadmoreHandle} autoRepeateAfter={7} />) ||     
        (
            (!noMore) && (
                <div className="text-center mt-2">
                    <button className="btn btn-warning" onClick={ (e) => {e.preventDefault(); loadmoreHandle(); } }>
                        Загрузить ещё
                    </button>
                </div>
            )
        )     
    );
}

const mapStateToProps = (state,ownProps) => {
    const {loadmore} = state;
    return {...ownProps, ...loadmore};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Loadmore);
export {ConnectedComponent as Loadmore};