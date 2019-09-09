import {createStore, combineReducers, applyMiddleware} from "redux";
import searchReducer from '../reducers/search';
import createSagaMiddleware from 'redux-saga';
import saga from'../sagas';

const reducer = combineReducers({
    search: searchReducer,
});


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store;