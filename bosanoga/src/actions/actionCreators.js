import * as types from'./actionTypes';

//--------------------------------------------------------------------------------------------------------------
//search
export const upSearch = (seachr) => { 
    return {type:types.UP_SEARCH, payload:{seachr}};
};
export const setSearch = (search) => { 
    return {type:types.SET_SEARCH, payload:{search}};
};
export const clearSearch = () => { 
    return {type:types.CLEAR_SEARCH, payload:{}};
};

//--------------------------------------------------------------------------------------------------------------
//loadMoreCatalog
export const loadMoreRequest = () => { 
    return {type:types.LOADMORE_REQUEST, payload:{}};
};
export const loadMoreSuccess = (items, count) => { 
    return {type:types.LOADMORE_SUCCESS, payload:{items, count}};
};
export const loadMoreFailure = (message) => { 
    return {type:types.LOADMORE_FAILURE, payload:{message}};
};
export const loadMoreRefresh = (full) => { 
    return {type:types.LOADMORE_REFRESH, payload:{full:full}};
};
export const loadMoreThunk = (categoryId, search, offset, count=6) => async (dispatch) => {
    
    dispatch(fetchCatalogThunk(
        categoryId, 
        search,
        offset,
        loadMoreRequest,
        (items) => { return loadMoreSuccess(items, count) },
        loadMoreFailure
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

export const appendCatalog = (newItems) => { 
    return {type:types.APPEND_CATALOG, payload:{newItems}};
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
        params += `${params ? '&' : ''}q=${search}`;
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
//Cart
export const loadToCart = () => { 
    return {type:types.LOAD_CART, payload:{}};
};
export const addToCart = ({item, size, count}) => { 
    return {type:types.ADD_TO_CART, payload:{item, size, count}};
};
export const delToCart = (id, size) => { 
    return {type:types.DEL_TO_CART, payload:{item:{id}, size}};
};
export const setToCart = ({item, size, count}) => { 
    return {type:types.SET_TO_CART, payload:{item, size, count}};
};
export const clearToCart = () => { 
    return {type:types.CLEAR_CART, payload:{}};
};
//--------------------------------------------------------------------------------------------------------------
//Order
export const postOrderRequest = () => { 
    return {type:types.POST_ORDER_REQUEST, payload:{}};
};
export const postOrderSuccess = (result) => { 
    return {type:types.POST_ORDER_SUCCESS, payload:{result}};
};
export const postOrderFailure = (message) => { 
    return {type:types.POST_ORDER_FAILURE, payload:{message}};
};
export const postOrderClear = () => { 
    return {type:types.POST_ORDER_CLEAR, payload:{}};
};


export const postOrderThunk = (order) => async (dispatch) => {
    dispatch(fetchThunk(
        `${process.env.REACT_APP_ROOT_URL}/api/order`, 
        order,
        null,
        postOrderRequest,
        postOrderSuccess,
        postOrderFailure
    ));
}
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
       
        let data = null;
        if (response.status !== 204){
            data = await response.json();
        }
        (successDispatcher) && dispatch(successDispatcher(data));
    }
    catch(e){
        (errorDispatcher) && dispatch(errorDispatcher(e.message));
    } 
    (finishDispatcher) && dispatch(finishDispatcher());
};

