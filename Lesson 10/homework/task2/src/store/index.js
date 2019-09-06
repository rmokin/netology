import {createStore, combineReducers, applyMiddleware} from"redux";
import serviceReducer from'../reducers/service';
import servicesReducer from'../reducers/services';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    services: servicesReducer,
    service: serviceReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));
export default store;