import {createStore, combineReducers, applyMiddleware} from "redux";
import serviceReducer from '../reducers/service';
import servicesReducer from '../reducers/services';
import createSagaMiddleware from 'redux-saga';
import saga from'../sagas';

const reducer = combineReducers({
    service: serviceReducer,
    services: servicesReducer,
});


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store;