import * as types from'./actionTypes';

export const fetchSearchRequest = (search) => { 
    return {type:types.FETCH_SEARCH_REQUEST, payload:{search}};
};
export const fetchSearchFailure = (message) => { 
    return {type:types.FETCH_SEARCH_FAILURE, payload:{message}};
};
export const fetchSearchSuccess = (items) => { 
    return {type:types.FETCH_SEARCH_SUCCESS, payload:{items}};
};
export function changeSearchField(search){
    return {type: types.CHANGE_SEARCH_FIELD, payload:{search}};
}
export function clearSearchField(){
    return {type: types.CLEAR_SEARCH_FIELD, payload:{}};
}
/*
export const fetchEx = (url, postData, opt={}, starterDispatcher, successDispatcher, errorDispatcher, finishDispatcher) => async (dispatch) => {
    (starterDispatcher) && starterDispatcher();
    try{
        const response = await fetch(url,{
            cache: 'no-cache',
            referrer: 'no-referrer',
            method: ((postData) && 'POST') || 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: ((postData) && JSON.stringify(postData)) || (undefined),
            ...opt,
        });
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const data = await response.json();
        (successDispatcher) && successDispatcher(data);
    }
    catch(e){
        (errorDispatcher) && errorDispatcher(e.message);
    } 
    (finishDispatcher) && finishDispatcher();
};

export const fetchSearch = ({search: name}) => {
    fetchEx(
        `${process.env.REACT_APP_SERVICES_URL}/search`, 
        {name},
        null,
        fetchSearchRequest,
        fetchSearchSuccess,
        fetchSearchFailure,
    );
}
*/



