import * as types from'../actions/actionTypes';


const initState = {
    isOrdered: false,
    isLoading: false,
    hasError: null,
};


export default function orderReducer(state = initState, action){
    switch(action.type){
        case types.POST_ORDER_REQUEST:
            return {...state, isLoading: true, hasError:null, isOrdered:false};
        case types.POST_ORDER_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message, isOrdered:false};
        case types.POST_ORDER_SUCCESS:
            return {...state, isLoading:false, hasError:null, isOrdered: true};
        case types.POST_ORDER_CLEAR:
            return {...state, isLoading:false, hasError:null, isOrdered: false};
        default:
            return state;
    }

}