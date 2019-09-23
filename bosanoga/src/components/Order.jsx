import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';

import Preloader from './Preloader';
import Error from './Error';
import {Redirect} from 'react-router-dom';
import {postOrderThunk, clearToCart, postOrderClear} from '../actions/actionCreators';

function Order(props){

    const {hasShowOrder, items} = props;

    const {
        isOrdered,
        isLoading, 
        hasError,
        
    } = useSelector(state => state.order);



    const [state, setState] = React.useState({});
    const handleChangeInput = ( e ) => {

        setState({
            ...state,
            [e.target.id]: 
                e.target.type === 'checkbox' 
                    ? e.target.checked 
                    : e.target.value, 
        });
    }

    const dispatch = useDispatch();

    const handleRepeate = () => {
        createOrder();
    };

    const createOrder = () => {
        dispatch(postOrderThunk({
            owner: {...state},
            items: Object.keys(items).reduce( (value, key) => {
                return [...value, {
                    id: items[key]['item']['id'],
                    price: items[key]['item']['price'],
                    size: items[key]['size'],    
                    count: items[key]['count'],
                }]; 
            }, [])
        }));
        
    }

    const handleCreateOrder = (e) => {
        e.preventDefault();
        createOrder();
    }


    return (
        (isLoading && <Preloader />) || 
        (hasError && <Error message={hasError} handleRepeate={handleRepeate} />) || 
        (isOrdered && <Redirect push={false} to={'/ordered'} /> ) ||
        (
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{'maxWidth': '30rem', 'margin': '0 auto'}}>
                    <form className="card-body" onSubmit={ handleCreateOrder }>
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input className="form-control" id="phone" placeholder="Ваш телефон" value={state.phone || ''} onChange={ handleChangeInput } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input className="form-control" id="address" placeholder="Адрес доставки" value={state.address || ''} onChange={ handleChangeInput } />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement" value="is_agreed" defaultChecked={false} onChange={ handleChangeInput }/>
                            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>
                        <button 
                            disabled={!state.phone || !state.address || !state.agreement }
                            type="submit" 
                            className="btn btn-outline-secondary">
                            Оформить
                        </button>
                    </form>
                </div>
            </section>
        )
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

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Order);
export {ConnectedComponent as Order};

