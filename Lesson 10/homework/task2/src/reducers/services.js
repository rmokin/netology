import * as types from'../actions/actionTypes';


const initState = {
    items: [],
    isLoading: false,
    hasError: null,
    deleting:{}
};


export default function servicesReducer(state = initState, action){
    switch(action.type){
        case types.FETCH_SERVICES_REQUEST:
            return {...state, isLoading:true, hasError:null};
        case types.FETCH_SERVICES_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message};
        case types.FETCH_SERVICES_SUCCESS:
            const {items} = action.payload;
            return {...state, items, isLoading:false, hasError:null};
        case types.DELETE_SERVICE_REQUEST:
            const {serviceId: serviceIdR} = action.payload;
            const {deleting: deletingR} = state;
            return {...state, deleting: {...deletingR, [serviceIdR]:true}};
        case types.DELETE_SERVICE_FAILURE:
            const {message: messageDeleteFailure} = action.payload;
            const {serviceId: serviceIdF} = action.payload;
            const {deleting: deletingF} = state;
            return {...state, hasError:messageDeleteFailure, deleting:{...deletingF, [serviceIdF]:false}};    
        case types.DELETE_SERVICE_SUCCESS:
            const {serviceId: serviceIdS} = action.payload;
            const {deleting: deletingS} = state;
            return {...state, deleting:{...deletingS, [serviceIdS]:false}};    
        case types.DEL_SERVICE:
            const {id} = action.payload;
            return {...state, items: state.items.filter(o=>o.id!==id)}
        default:
            return state;
    }

}