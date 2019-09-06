import React from 'react';
import {useSelector, useDispatch} from'react-redux';
import {changeServiceField, addService, editService, unselectService, clearServiceField} from'../actions/actionCreators';

export function AddEdit(props){
    
    const {selected, items} = useSelector(state => state.serviceList);
    const {name = selected.name, price = selected.price} = useSelector(state => state.serviceAddEdit);
    const dispatch = useDispatch();
    const handleChange = e => {
        const {name,value} = e.target;
        dispatch(changeServiceField(name,value));
    }
    
    const handleAdd = e => {
        e.preventDefault();
        dispatch(addService(name, price));
        dispatch(clearServiceField());
    }

    const handleEdit = e => {
        e.preventDefault();
        dispatch(editService(selected.id, name, price));
        dispatch(unselectService());
    }
    const handleCancelEdit = e => {
        e.preventDefault();
        dispatch(unselectService());
        dispatch(clearServiceField());
        
    }

    
    return (
        <div className="add-edit">
            <div className="inputs">
                <input name="name" type="text" value={name || ''} onChange={ handleChange } />
                <input name="price" type="number" value={price || ''} onChange={ handleChange } />
                {
                    (!selected.id ) && (
                        <div className="controls">
                            <button  onClick={handleAdd}>Add</button>
                        </div>
                    )
                }
                {
                    (selected.id) && (
                        <div className="controls">
                            <button  onClick={handleEdit}>
                            {
                                items.filter( o => o.id === selected.id ).length > 0 
                                ? "Edit"
                                : "Add" 
                            }
                            </button>
                            <button  onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    )
                }
            </div>
            
        </div>
    );

}