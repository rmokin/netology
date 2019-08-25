import React from 'react';
import '../App.css';
import uuidv1 from 'uuid/v1';


function format (str, params) {
    
    for (let p in params){
        var reg = new RegExp("\\{" + p + "\\}", "gm");
        str = str.replace(reg, params[p]);
    }
    
    return str;
};

export function Item(props){

    const [state, setState] = React.useState({
        item: {},
        isLoading: false,
    })

    React.useEffect(()=>{
        if (!props.id){
            return;
        }
        setState({
            ...state,
            isLoading: true,
        })
        
        const url = process.env.REACT_APP_ROOT_URL + format(process.env.REACT_APP_ITEM_URL, {"id":props.id});
        fetch(url,{
            cache: 'no-cache',
            method: 'GET',
            referrer: 'no-referrer',
        })
            .then((response) => {return response.json()})
            .then((json) => {
              setState({
                ...state,
                item: json,
                isLoading:false
              })
            })
    }, [props.id])
    const result = state.isLoading 
        ? (
            <div className="loading">Loading...</div>
        )
        : (
            props.id 
            ? (
                <div>
                    <img src={`${state.item.avatar}?${state.item.id}`} alt={`avatar for ${state.item.name}`}/>
                    <h1>{state.item.name}</h1>
                    <div>City:{state.item.details && state.item.details.city}</div>
                    <div>Company:{state.item.details && state.item.details.company}</div>
                    <div>Company:{state.item.details && state.item.details.position}</div>    
                </div>
            )
            : null
        )
    return (
        <div className="item-view">
            {
               result    
            }
        </div>
    );
}