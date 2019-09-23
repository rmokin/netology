import {createStore, combineReducers, applyMiddleware} from"redux";
import topsalesReducer from'../reducers/topsales';
import productReducer from'../reducers/product';
import categoriesReducer from'../reducers/categories';
import catalogReducer from'../reducers/catalog';
import loadmoreReducer from'../reducers/loadmore';
import searchReducer from'../reducers/search';
import cartReducer from "../reducers/cart";
import orderReducer from "../reducers/order";
import thunk from 'redux-thunk';


const reducer = combineReducers({
    topsales: topsalesReducer,
    product: productReducer,
    categories: categoriesReducer,
    catalog: catalogReducer,
    loadmore: loadmoreReducer,
    search: searchReducer,
    cart: cartReducer,
    order: orderReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));
export default store;