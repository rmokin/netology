import {ADD_SERVICE, DEL_SERVICE, SEL_SERVICE, CHANGE_SERVICE_FIELD,EDIT_SERVICE, CLEAR_SERVICE_FIELD} from'./actionTypes';
export function addService(name,price){
    return {type: ADD_SERVICE, payload: {name, price}};
}
export function editService(id,name,price){
    return {type: EDIT_SERVICE, payload: {id, name, price}};
}
export function removeService(id){
    return {type: DEL_SERVICE, payload:{id}};
}
export function selectService(id){
    return {type: SEL_SERVICE, payload:{id}};
}
export function unselectService(){
    return {type: SEL_SERVICE, payload:{}};
}
export function changeServiceField(name,value){
    return {type: CHANGE_SERVICE_FIELD, payload:{name,value}};
}
export function clearServiceField(name,value){
    return {type: CLEAR_SERVICE_FIELD, payload:{}};
}
