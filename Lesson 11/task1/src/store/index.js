import {createStore, combineReducers, applyMiddleware} from"redux";
import searchReducer from'../reducers/search';
import {combineEpics, createEpicMiddleware} from'redux-observable';
import {startSearchEpic, clearSearchEpic, searchEpic}from'../epics';

const reducer = combineReducers({
    search: searchReducer,
});

const epic = combineEpics(
    startSearchEpic,
    clearSearchEpic,
    searchEpic,
);
const epicMiddleware = createEpicMiddleware();

const store = createStore(reducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(epic);
export default store;