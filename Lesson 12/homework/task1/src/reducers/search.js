import * as types from'../actions/actionTypes';


const initState = {
    search: '',
    items: [],
    isLoading: false,
    hasError: null,
};


export default function searchReducer(state = initState, action){

    switch(action.type){
        case types.FETCH_SEARCH_REQUEST:
            return {...state, isLoading: true, hasError: null};
        case types.FETCH_SEARCH_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading: false, hasError: message};
        case types.FETCH_SEARCH_SUCCESS:
            const {items} = action.payload
            return {...state, isLoading: false, items  }
        case types.CHANGE_SEARCH_FIELD:
            const {search = ''} = action.payload;
            return {...state,  search  }
        case types.CLEAR_SEARCH_FIELD:
            return initState;
        default:
            return state;
    }

}