import * as types from'../actions/actionTypes';


const initState = {
    items: [],
    isLoading: false,
    hasError: null,
    noMore: false,
};


export default function loadMoreReducer(state = initState, action){
    switch(action.type){
        case types.LOADMORE_REQUEST:
            return {...state, items: [], isLoading:true, hasError:null};
        case types.LOADMORE_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message};
        case types.LOADMORE_SUCCESS:
            const {items = [], count} = action.payload;
            return {...state, items,noMore: items.length < count, isLoading:false, hasError:null};
        case types.LOADMORE_REFRESH:
            const {full} = action.payload;
            const {noMore} = state;
            return {...state, items: [], noMore: full ? false : noMore};
        default:
            return state;
    }

}