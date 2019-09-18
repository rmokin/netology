import * as types from'../actions/actionTypes';


const initState = {
    items: [],
    isLoading: false,
    hasError: null,
    selectedCategory: {}
};


export default function categoriesReducer(state = initState, action){
    switch(action.type){
        case types.FETCH_CATEGORIES_REQUEST:
            return {...state, isLoading:true, hasError:null};
        case types.FETCH_CATEGORIES_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message};
        case types.FETCH_CATEGORIES_SUCCESS:
            const {items} = action.payload;
            return {...state, items, isLoading:false, hasError:null};
        case types.SELECT_CATEGORY:
            const {category} = action.payload;
            return {...state, selectedCategory: category};
        default:
            return state;
    }

}