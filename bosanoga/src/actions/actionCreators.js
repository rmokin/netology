import * as types from'./actionTypes';

//--------------------------------------------------------------------------------------------------------------
//UpToCatalog
export const uptoCatalogRequest = () => { 
    return {type:types.UPTO_CATALOG_REQUEST, payload:{}};
};
export const uptoCatalogSuccess = (items) => { 
    return {type:types.UPTO_CATALOG_SUCCESS, payload:{items}};
};
export const uptoCatalogFailure = (message) => { 
    return {type:types.UPTO_CATALOG_FAILURE, payload:{message}};
};
export const uptoCatalogThunk = (categoryId, search, offset) => async (dispatch) => {
    dispatch(fetchCatalogThunk(
        categoryId, 
        search,
        offset,
        uptoCatalogRequest,
        uptoCatalogSuccess,
        uptoCatalogFailure
    ));
};
//--------------------------------------------------------------------------------------------------------------
//Catalog
export const fetchCatalogRequest = () => { 
    return {type:types.FETCH_CATALOG_REQUEST, payload:{}};
};

export const fetchCatalogSuccess = (items) => { 
    return {type:types.FETCH_CATALOG_SUCCESS, payload:{items}};
};

export const fetchCatalogFailure = (message) => { 
    return {type:types.FETCH_CATALOG_FAILURE, payload:{message}};
};

export const getCatalogThunk = (categoryId, search) => async (dispatch) => {
    dispatch(fetchCatalogThunk(
        categoryId, 
        search,
        null,
        fetchCatalogRequest,
        fetchCatalogSuccess,
        fetchCatalogFailure
    ));
};

export const fetchCatalogThunk = (categoryId, search, offset, successDispatcher, errorDispatcher, finishDispatcher) => async (dispatch) => {
    let params = '';
    if (categoryId){
        params += `${params ? '&' : ''}categoryId=${categoryId}`;
    }
    if (search){
        params += `${params ? '&' : ''}q=${categoryId}`;
    }
    if (offset){
        params += `${params ? '&' : ''}offset=${offset}`;
    }
    if (params){
        params = `?${params}`;
    }
    dispatch(fetchThunk(
        `${process.env.REACT_APP_ROOT_URL}/api/items${params}`, 
        null,
        null,
        successDispatcher,
        errorDispatcher,
        finishDispatcher
    ));
}
//--------------------------------------------------------------------------------------------------------------
//TopSales
export const fetchTopSalesRequest = () => { 
    return {type:types.FETCH_TOPSALES_REQUEST, payload:{}};
};
export const fetchTopSalesSuccess = (items) => { 
    return {type:types.FETCH_TOPSALES_SUCCESS, payload:{items}};
};
export const fetchTopSalesFailure = (message) => { 
    return {type:types.FETCH_TOPSALES_FAILURE, payload:{message}};
};
export const fetchTopSalesThunk = () => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_ROOT_URL}/api/top-sales`, 
        null,
        null,
        fetchTopSalesRequest,
        fetchTopSalesSuccess,
        fetchTopSalesFailure
    ));
}
//--------------------------------------------------------------------------------------------------------------
//Product
export const fetchProductRequest = () => { 
    return {type:types.FETCH_PRODUCT_REQUEST, payload:{}};
};
export const fetchProductSuccess = (item) => { 
    return {type:types.FETCH_PRODUCT_SUCCESS, payload:{item}};
};
export const fetchProductFailure = (message) => { 
    return {type:types.FETCH_PRODUCT_FAILURE, payload:{message}};
};
export const changeProductCount = (count) => { 
    return {type:types.CHANGE_PRODUCT_COUNT, payload:{count}};
};
export const changeProductSize = (size) => { 
    return {type:types.CHANGE_PRODUCT_SIZE, payload:{size}};
};
export const fetchProductThunk = (productId) => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_ROOT_URL}/api/items/${productId}`, 
        null,
        null,
        fetchProductRequest,
        fetchProductSuccess,
        fetchProductFailure
    ));
}
//--------------------------------------------------------------------------------------------------------------
//Card
export const addToCard = ({id, size, count}) => { 
    return {type:types.ADD_TO_CARD, payload:{id, size, count}};
};
//--------------------------------------------------------------------------------------------------------------
//Categories
export const fetchCategoriesRequest = () => { 
    return {type:types.FETCH_CATEGORIES_REQUEST, payload:{}};
};
export const fetchCategoriesSuccess = (items) => { 
    return {type:types.FETCH_CATEGORIES_SUCCESS, payload:{items}};
};
export const fetchCategoriesFailure = (message) => { 
    return {type:types.FETCH_CATEGORIES_FAILURE, payload:{message}};
};
export const selectCategory = (category) => { 
    return {type:types.SELECT_CATEGORY, payload:{category}};
};
export const fetchCategoriesThunk = () => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_ROOT_URL}/api/categories`, 
        null,
        null,
        fetchCategoriesRequest,
        fetchCategoriesSuccess,
        fetchCategoriesFailure
    ));
}


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







/*

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
/*
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
};*/
/*
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
*/