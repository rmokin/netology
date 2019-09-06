import shortid from 'shortid';
import {ADD_SERVICE, DEL_SERVICE, SEL_SERVICE, EDIT_SERVICE} from '../actions/actionTypes';


const initState = {
    selected: {},
    items:[
        {id: shortid.generate(), name: "asdasf", price: 21000},
        {id: shortid.generate(), name: "dsfg", price: 25000}
    ]
};


export default function serviceListReducer(state = initState, action){
    
    switch(action.type){
        case ADD_SERVICE:
            const {name,price} = action.payload;
            return {
                ...state,
                items: [
                    ...state.items,
                    { 
                        id: shortid.generate(),
                        name,
                        price: Number(price)
                    }
                ]
            };
        case EDIT_SERVICE:
                const {id: editId, name: editName,price: editPrice} = action.payload;
                return {
                    ...state,
                    items: [
                        ...state.items.filter( (item) => { return item.id !== editId; }),
                        { 
                            id: state.items.filter( (item) => { return item.id !== editId; }).length > 0 ? editId : shortid.generate(),
                            name: editName,
                            price: Number(editPrice)
                        }
                    ]
                };
        case DEL_SERVICE:
            const {id: delId} = action.payload;
            return {
                ...state,
                items: state.items.filter( (item) => { return item.id !== delId; }),
            };
        case SEL_SERVICE:
            const {id: selId=''} = action.payload;
            return {
                ...state,
                selected: state.items.filter( (item) => { return item.id === selId; })[0] || {}
            };
        default:
            return state;
    }

}