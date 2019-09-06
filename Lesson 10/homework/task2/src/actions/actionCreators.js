import * as types from'./actionTypes';

export const fetchServicesRequest = () => { 
    return {type:types.FETCH_SERVICES_REQUEST};
};
export const fetchServicesFailure = (message) => { 
    return {type:types.FETCH_SERVICES_FAILURE, payload:{message}};
};
export const fetchServicesSuccess = (items) => { 
    return {type:types.FETCH_SERVICES_SUCCESS, payload:{items}};
};

export const fetchServiceFailure = (message) => { 
    return {type:types.FETCH_SERVICE_FAILURE, payload:{message}};
};
export const fetchServiceRequest = () => { 
    return {type:types.FETCH_SERVICE_REQUEST};
};
export const fetchServiceSuccess = (item) => { 
    return {type:types.FETCH_SERVICE_SUCCESS, payload:{item}};
};
export const fetchServiceSaveInit = () => { 
    return {type:types.SAVE_SERVICE_INIT, payload:{}};
};
export const fetchServiceSaveRequest = () => { 
    return {type:types.SAVE_SERVICE_REQUEST, payload:{}};
};
export const fetchServiceSaveSuccess = (item) => { 
    return {type:types.SAVE_SERVICE_SUCCESS, payload:{item}};
};
export const fetchServiceSaveFailure = (message) => { 
    return {type:types.SAVE_SERVICE_FAILURE, payload:{message}};
};

export const fetchServiceDeleteRequest = (serviceId) => { 
    return {type:types.DELETE_SERVICE_REQUEST, payload:{serviceId}};
};
export const fetchServiceDeleteSuccess = (serviceId) => { 
    return {type:types.DELETE_SERVICE_SUCCESS, payload:{serviceId}};
};
export const fetchServiceDeleteFailure = (serviceId,message) => { 
    return {type:types.DELETE_SERVICE_FAILURE, payload:{serviceId, message}};
};

export const fetchThunk = (url, postData, opt={}, starterDispatcher, successDispatcher, errorDispatcher, finishDispatcher) => async (dispatch) => {
    (starterDispatcher) && dispatch(starterDispatcher());
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
        (successDispatcher) && dispatch(successDispatcher(data));
    }
    catch(e){
        (errorDispatcher) && dispatch(errorDispatcher(e.message));
    } 
    (finishDispatcher) && dispatch(finishDispatcher());
};

export const fetchServicesThunk = () => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_SERVICES_URL}`, 
        null,
        null,
        fetchServicesRequest,
        fetchServicesSuccess,
        fetchServicesFailure
    ));
}

export const fetchServiceThunk = (serviceId) => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_SERVICES_URL}/${serviceId}`, 
        null,
        null,
        fetchServiceRequest,
        fetchServiceSuccess,
        fetchServiceFailure
    ));
}

export const fetchServiceSaveThunk = (serviceId, name, price, content) => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_SERVICES_URL}/${serviceId}`, 
        {
            name,
            price,
            content
        },
        null,
        fetchServiceSaveRequest,
        fetchServiceSaveSuccess,
        fetchServiceSaveFailure
    ));
}

export const fetchServiceDeleteThunk = (serviceId) => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_SERVICES_URL}/${serviceId}`, 
        null,
        {
            method: 'DELETE',
        },
        () => { return fetchServiceDeleteRequest(serviceId) },
        (data) => { return fetchServiceDeleteSuccess(serviceId) },
        (message) => { return fetchServiceDeleteFailure(serviceId, message) },
    ));
}


export function changeServiceField(name,value){
    return {type: types.CHANGE_SERVICE_FIELD, payload:{name,value}};
}

export function clearServiceField(){
    return {type: types.CLEAR_SERVICE_FIELD, payload:{}};
}
