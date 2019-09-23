import * as types from'../actions/actionTypes';


const initState = {
    search: '',
    seachr: '',
};


export default function searchReducer(state = initState, action){
    switch(action.type){
        case types.UP_SEARCH:
            const {seachr} = action.payload;
            return {...state, seachr};
        case types.SET_SEARCH:
            const {search:newSearch} = action.payload;
            const {seachr:stateSearch} = state;
            return {...state, search: newSearch || stateSearch};
        case types.CLEAR_SEARCH:
            return {...state, search: '', seachr:''};
        default:
            return state;
    }

}