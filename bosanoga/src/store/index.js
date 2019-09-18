import {createStore, combineReducers, applyMiddleware} from"redux";
import serviceReducer from'../reducers/service';
import servicesReducer from'../reducers/services';
import topsalesReducer from'../reducers/topsales';
import productReducer from'../reducers/product';
import categoriesReducer from'../reducers/categories';
import catalogReducer from'../reducers/catalog';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    services: servicesReducer,
    service: serviceReducer,
    topsales: topsalesReducer,
    product: productReducer,
    categories: categoriesReducer,
    catalog: catalogReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));
export default store;