import * as types from'../actions/actionTypes';


const initState = {
    items: [],
    isLoading: false,
    hasError: null,
};


export default function catalogReducer(state = initState, action){
    switch(action.type){
        case types.FETCH_CATALOG_REQUEST:
            return {...state, isLoading: true, hasError:null};
        case types.FETCH_CATALOG_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message};
        case types.FETCH_CATALOG_SUCCESS:
            const {items} = action.payload;
            return {...state, items, isLoading:false, hasError:null};
        default:
            return state;
    }

}