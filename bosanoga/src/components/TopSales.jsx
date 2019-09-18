import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';

import {Link} from 'react-router-dom';
import {fetchTopSalesThunk } from '../actions/actionCreators';
import Preloader from './Preloader';
import Error from './Error';
import Numeric from './Numeric';


function TopSales(props){

    const {
        items = [], 
        isLoading, 
        hasError = null,
    } = useSelector(state => state.topsales);
    
    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(fetchTopSalesThunk());
        return () => {};
    },[]);

    const handleRepeate = () => {
        dispatch(fetchTopSalesThunk());
    }


    return (
        (isLoading && <Preloader />) || 
        (hasError && <Error message={hasError} handleRepeate={handleRepeate} autoRepeateAfter={7} />) || 
        (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {
                    
                    items
                        .reduce((rows, key, index) => (index % 3 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
                        .map((row, index) => {
                            
                            return (
                                <div key={index} className="row">
                                    {
                                        row.map((item) => {
                                            const {id, title, images, price} = item;
                                            return (
                                                <div key={id} className="col-4">
                                                    <div className="card">
                                                        <img src={images[0]} className="card-img-top img-fluid" alt={title} />
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
            </section>
        )
    );

}

const mapStateToProps = (state,ownProps) => {
    const {topsales: {items, isLoading, hasError}} = state;
    return {...ownProps, items, isLoading, hasError};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(TopSales);
export {ConnectedComponent as TopSales};

