import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import classNames from 'classnames';
import {fetchProductThunk, changeProductCount, changeProductSize, addToCard } from '../actions/actionCreators';
import Preloader from './Preloader';
import Error from './Error';

function Product(props){

    const {
        item: {title, images=[], sku, manufacturer, color, material, season, reason, sizes }, 
        isLoading, 
        hasError,
        size:selectSize,
        count = 1,
    } = useSelector(state => state.product);
    const {match: {params: {productId}}, history} = props;
    
    const dispatch = useDispatch();
    const availOrder = sizes && sizes.filter( item =>  item.avalible ).length > 0; 
    const canOrderd = availOrder && selectSize;

    React.useEffect( () => {
        dispatch(fetchProductThunk(productId));
        return () => {};
    },[]);

    const handleRepeate = () => {
        dispatch(fetchProductThunk(productId));
    };

    const plusOne = () => {
        ((count + 1) <= 10) && dispatch(changeProductCount(count + 1));
    };

    const minusOne = () => {
        ((count - 1) > 0) &&  dispatch(changeProductCount(count - 1));
    };

    const changeSize = (size) => {
        dispatch(changeProductSize(size));
    };

    const buy = () => {
        dispatch(addToCard({
            id: productId, 
            size: selectSize, 
            count
        }));
        history.push('/card');
    };

    return (
        (isLoading && <Preloader />) || 
        (hasError && <Error message={hasError} handleRepeate={handleRepeate} autoRepeateAfter={7} />) || 
        (
            <section className="catalog-item">
                <h2 className="text-center">{title}</h2>
                <div className="row">
                    <div className="col-5">
                        <img src={images[0]} className="img-fluid" alt={title} />
                    </div>
                    <div className="col-7">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Артикул</td>
                                    <td>{sku}</td>
                                </tr>
                                <tr>
                                    <td>Производитель</td>
                                    <td>{manufacturer}</td>
                                </tr>
                                <tr>
                                    <td>Цвет</td>
                                    <td>{color}</td>
                                </tr>
                                <tr>
                                    <td>Материалы</td>
                                    <td>{material}</td>
                                </tr>
                                <tr>
                                    <td>Сезон</td>
                                    <td>{season}</td>
                                </tr>
                                <tr>
                                    <td>Повод</td>
                                    <td>{reason}</td>
                                </tr>
                            </tbody>
                        </table>
                        {
                            availOrder && (
                                <div className="text-center">
                                    <p>Размеры в наличии: 
                                        {
                                            sizes.map( ({size, avalible}, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className={classNames("catalog-item-size", 
                                                            {"selected": size === selectSize},
                                                            {"unavailable": !avalible})
                                                        }
                                                        onClick = { (e) => { e.preventDefault(); avalible && changeSize(size) } }
                                                    >
                                                        {size}
                                                    </span>
                                                );
                                            })
                                        }
                                    </p>
                                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                            <button className="btn btn-secondary" onClick={ (e) => { e.preventDefault(); minusOne(); } }>-</button>
                                            <span className="btn btn-outline-primary">{count}</span>
                                            <button className="btn btn-secondary" onClick={ (e) => { e.preventDefault(); plusOne(); } }>+</button>
                                        </span>
                                    </p>
                                </div>
                            )

                        }
                        <button className="btn btn-danger btn-block btn-lg" disabled={!canOrderd} onClick={ (e) => { e.preventDefault(); canOrderd &&  buy(); } }>
                            {availOrder ? 'В корзину' : 'Нет в наличие'}
                        </button>
                    </div>
                </div>
            </section>
        )
    );

}

const mapStateToProps = (state,ownProps) => {
    const {product} = state;
    return {...ownProps, ...product};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Product);
export {ConnectedComponent as Product};

