import * as types from'../actions/actionTypes';


const initState = {
    items: {},
    isLoaded: false
};

function loadObjectFromLocalStorage(objectName, defaults='{}'){
    return JSON.parse(localStorage.getItem(objectName) || defaults)
}
function saveObjectFromLocalStorage(objectName, data = {}){
    return localStorage.setItem(objectName, JSON.stringify(data));
}

export default function cartReducer(state = initState, action){
    
    const {items} = state;
    const {item, size, count = 0} = {
        item: {},
        ...action.payload
    };
    const {id} = item;
    let newItems = {};
    switch(action.type){
        case types.ADD_TO_CART:
            const newItem = Object.keys(items)
                            .filter( (key) => { return key === `${id}_${size}`;})
                            .reduce( (value, key) => { return {...value,...items[key]} }, {});
            newItems = {...items, [`${id}_${size}`]: {item,size,count: (newItem.count || 0) + count } };
            saveObjectFromLocalStorage('cart',newItems);
            return {...state, items: {...newItems} };
        case types.DEL_TO_CART:
            newItems = Object.keys(items)
                        .filter( (key) => { return key !== `${id}_${size}`;}) 
                        .reduce( (value, key) => { return {...value, [key]:{...items[key]}}}, {})
            saveObjectFromLocalStorage('cart',newItems);
            return {
                ...state, 
                items: {...newItems}
            };
        case types.SET_TO_CART:
            newItems = {...items, [`${id}_${size}`]: {item,size,count} };
            saveObjectFromLocalStorage('cart',newItems);
            return {
                ...state, 
                items: {...newItems}
            };
        case types.LOAD_CART:
            return {
                ...state, 
                items: loadObjectFromLocalStorage('cart'),
                isLoaded: true,
            };
        case types.CLEAR_CART:
            newItems = {};
            saveObjectFromLocalStorage('cart',newItems);
            return {
                ...state, 
                items: newItems,
            };
        default:
            return state;
    }

}