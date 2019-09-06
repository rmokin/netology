import {createStore,combineReducers} from"redux";
import serviceListReducer from'../reducers/serviceList';
import serviceAddEditReducer from'../reducers/serviceAddEdit';


const reducer=combineReducers({
    serviceList: serviceListReducer,
    serviceAddEdit: serviceAddEditReducer,
});
const store=createStore(reducer);
export default store;