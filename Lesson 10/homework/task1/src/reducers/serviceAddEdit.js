import {CHANGE_SERVICE_FIELD, CLEAR_SERVICE_FIELD} from '../actions/actionTypes';


const initState = {
    name: undefined,
    price: undefined,
};


export default function serviceAddEditReducer(state = initState, action){

    switch(action.type){
        case CHANGE_SERVICE_FIELD:
            const {name,value} = action.payload;
            return {...state, [name]: value  }
        case CLEAR_SERVICE_FIELD:
            return {...initState};
        default:
            return state;
    }

}