import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import {loadToCart, delToCart, postOrderClear, clearToCart} from '../actions/actionCreators';
import {Link} from 'react-router-dom';
import {Order} from './Order';
import Numeric from './Numeric';



function Cart(props){

    const {view, items:propsItems, handelUpdate} = props;
    const {
        items:reduceItems = {}, 
        isLoaded = false,
    } = useSelector(state => state.cart);
    const items = propsItems ? {...propsItems} : {...reduceItems};
    const dispatch = useDispatch();

    React.useEffect( () => {
        if (!isLoaded){
            dispatch(loadToCart());
        }
        return () => {};
    },[isLoaded]);

    return ( 
        (
            (view === 'mini') && (
                <div className="header-controls-pic header-controls-cart">
                    {
                        (Object.keys(items).length > 0) && (
                            <div className="header-controls-cart-full">
                                {Object.keys(items).length}
                            </div>
                        )
                    }
                    <div className="header-controls-cart-menu"></div>
                </div>
            )
        ) ||

        (
            <>
                {
                    (
                        <section className="cart">
                            <h2 className="text-center">Корзина</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Размер</th>
                                        <th scope="col">Кол-во</th>
                                        <th scope="col">Стоимость</th>
                                        <th scope="col">Итого</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(items).map( (key,index) => {
                                            return (
                                                <tr key={key}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <Link to={`/catalog/${items[key]['item']['id']}`}>
                                                            {items[key]['item']['title']}
                                                        </Link>
                                                    </td>
                                                    <td>{items[key]['size']}</td>
                                                    <td>{items[key]['count']}</td>
                                                    <td>
                                                        <Numeric value={items[key]['item']['price']} format={'0,0[.]00 $'} />
                                                    </td>
                                                    <td>
                                                        <Numeric value={items[key]['count'] * items[key]['item']['price']} format={'0,0[.]00 $'} />
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={ (e) => {
                                                                e.preventDefault(); 
                                                                dispatch(delToCart(items[key]['item']['id'],items[key]['size'])); 
                                                            }}
                                                        >
                                                            Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    <tr>
                                        <td colSpan="5" className="text-right">Общая стоимость</td>
                                        <td>
                                            {
                                                Object.keys(items).reduce( (value, key) => {
                                                    return (
                                                        value + items[key]['item']['price'] * items[key]['count']
                                                    );
                                                }, 0)
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    )
                }
                {
                    (Object.keys(items).length > 0) && (
                        <Order items={items} hasShowOrder={false}/>
                    )
                }
                
            </>
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

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Cart);
export {ConnectedComponent as Cart};