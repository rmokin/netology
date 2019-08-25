import React from 'react';
import classNames from 'classnames';
import '../App.css';
export function List(props){

    const [state, setState] = React.useState({
        items: [],
        isLoading: false,
    });

    React.useEffect(()=>{
        setState({
            ...state,
            isLoading: true,
        })
        
        const url = process.env.REACT_APP_ROOT_URL + process.env.REACT_APP_LIST_URL;
        
        fetch(url,{
            
            cache: 'no-cache',
            method: 'GET',
            referrer: 'no-referrer',
        })
            .then((response) => { return response.json()})
            .then((json) => {
                
              setState({
                ...state,
                isLoading: false,
                items: json,
              })
            })
        return () => { setState({...state, items:[]}) }
    },[])
    return (
        <div className="items">
            {
                state.isLoading
                ? (
                    <div className="laoding">Loading...</div>  
                )
                : (
                    <ul>
                    {
                        state.items.map((item,index) => {
                            return (
                                <li 
                                    key={item.id} 
                                    className={classNames({
                                        'item': true,
                                        'active': item.id === props.selected
                                    })} 
                                    onClick={(evt) => {evt.preventDefault(); props.handleClick(item.id)} }>
                                    {item.name}
                                </li>
                            );
                        })
                    }
                    </ul>
                )
            }
        </div>
        
    );

}