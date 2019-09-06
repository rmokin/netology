import * as types from'../actions/actionTypes';


const initState = {
    item: {},
    isLoading: false,
    hasError: null,
    wasSaved: false,
};


export default function serviceReducer(state = initState, action){

    switch(action.type){
        case types.FETCH_SERVICE_REQUEST:
            return {...state, isLoading: true, hasError: null};
        case types.FETCH_SERVICE_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading: false, hasError: message};
        case types.FETCH_SERVICE_SUCCESS:
            const {item:itemFetched} = action.payload
            return {...state, isLoading:false, item: itemFetched  }
        case types.SAVE_SERVICE_REQUEST:
            return {...state, wasSaved:false, isLoading: true, hasError: null}
        case types.SAVE_SERVICE_SUCCESS:
            return {...initState, wasSaved:true};
        case types.SAVE_SERVICE_FAILURE:
            return {...state, isLoading: false, hasError: message};
        case types.SAVE_SERVICE_INIT:
                return {...initState};
        case types.CHANGE_SERVICE_FIELD:
            const {name,value} = action.payload;
            const {item} = state;
            return {...state, item: {...item, [name]: value}  }
        case types.CLEAR_SERVICE_FIELD:
            return {...initState};
        default:
            return state;
    }

}