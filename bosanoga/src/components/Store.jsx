import React from 'react';
import {Link} from 'react-router-dom';
import {connect, useSelector,useDispatch} from'react-redux';
import Numeric from './Numeric';
import Preloader from './Preloader';
import Error from './Error';
import {Loadmore} from './Loadmore';
import {appendCatalog, loadMoreRefresh} from '../actions/actionCreators';


function Store(props){

    const {reducers = [], dispatcher, stater = state => state, canMore = false} = props;
    const {
        items = [], 
        newItems = [],
        isLoading = false, 
        hasError = null,
        selectedCategory = null,
        search = '',
        offset = 0,
    } = stater(useSelector(state => {
        return (
            reducers.length > 0 
                ? reducers.reduce( (agrigate, reducer ) => {
                    return {
                        ...agrigate, 
                        ...(
                            reducer instanceof Object
                            ? Object.keys(reducer).reduce( (a,r) => {
                                return ((reducer[r] instanceof Object) && (Object.keys(reducer[r]).reduce( (v, k) => {
                                    return {...v, ...{[ reducer[r][k] ]: state[r][k]}};
                                }, {}))) ||
                                ((reducer[r] instanceof Array) && (reducer[r].reduce( (b,k) => {
                                    return {...b, ...{[state[r][k]]: state[r][k]}};
                                }, {}))) ||
                                ({...a, ...{[state[r][reducer[r]]]: state[r][reducer[r]]} })
                            }, {} ) 
                            : state[reducer]

                        )};
                }, {}) 
                : state
        );
    }));
    
    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(dispatcher({selectedCategory,search,offset}));
        dispatch(loadMoreRefresh(true));
        return () => {};
    },[selectedCategory, search]);

    React.useEffect( () => {
        dispatch(appendCatalog(newItems));
        dispatch(loadMoreRefresh(false));
        return () => {};
    },[newItems.length]);

    const handleRepeate = () => {
        dispatch(dispatcher({selectedCategory,search,offset}));
    }
    
    return (
        <>
            {
                (isLoading && <Preloader />) || 
                (hasError && <Error message={hasError} handleRepeate={handleRepeate} autoRepeateAfter={7} />) ||     
                (
                    <>
                    {
                        items
                            .reduce((rows, key, index) => (index % 3 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
                            .map((row, index) => {
                                return (
                                    <div key={index} className="row">
                                        {
                                            row.map((item) => {
                                                const {id, title, images=[], price} = item;
                                                return (
                                                    <div key={id} className="col-4">
                                                        <div className="card">
                                                            <div className="image-container">
                                                                <img src={images[0]} className="card-img-top img-fluid" alt={title} />
                                                            </div>
                                                            <div className="card-body">
                                                                <p className="card-text">{title}</p>
                                                                <p className="card-text"><Numeric value={price} format={'0,0[.]00 $'} /></p>
                                                                
                                                            </div>
                                                            <div className="card-footer text-muted">
                                                                <Link to={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                );
                            })
                    }
                    {
                        (canMore && items.length >= 6) && <Loadmore category={selectedCategory || {}} search={search} offset={items.length} count={6} />
                    }
                    </>
                ) 
            }
        </>
    );

}

const mapStateToProps = (state,ownProps) => {
    return {...ownProps, ...state};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};


const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Store);
export {ConnectedComponent as Store};