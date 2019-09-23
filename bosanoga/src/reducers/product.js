import * as types from'../actions/actionTypes';


const initState = {
    item: {},
    isLoading: false,
    hasError: null,
    size: null,
    count: 1,
};


export default function productReducer(state = initState, action){
    switch(action.type){
        case types.FETCH_PRODUCT_REQUEST:
            return {...state, isLoading:true, hasError:null, size:null, count:1};
        case types.FETCH_PRODUCT_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message};
        case types.FETCH_PRODUCT_SUCCESS:
            const {item} = action.payload;
            return {...state, item, isLoading:false, hasError:null};
        case types.CHANGE_PRODUCT_COUNT:
            const {count} = action.payload;
            return {...state, count};
        case types.CHANGE_PRODUCT_SIZE:
            const {size} = action.payload;
            return {...state, size};
        default:
            return state;
    }

}