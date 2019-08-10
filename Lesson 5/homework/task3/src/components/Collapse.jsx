import React from 'react';
import '../App.css';

export function Collapse(props){

    const [state, setState] = React.useState({
        isExponded: false,
    });

    return (
        <div className="collapse">
            <div className="collapse-body">
                {
                    (state.isExponded) && props.children
                }
            </div>
            <div className="collapse-button">
                <a href="#" className="collapse-button-link" onClick={(e) => {setState({isExponded:!state.isExponded})} }>
                    {
                        ((state.isExponded) && (props.expondedLable || "Скрыть \u2303 ")) ||
                        ((!state.isExponded) && (props.collapsedLable || "Развернуть \u2304"))
                    }
                </a>
            </div>
        </div>
    );
    
}