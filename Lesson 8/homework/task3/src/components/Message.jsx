import React from 'react';

export function Message(props){

    const {message} = props;
    const [hide, setHide] = React.useState(false);

    return (
        <>
        {
            !hide && (
                <div className="message">
                    <button onClick={ (evt) => { evt.preventDefault(); setHide(true);} }>X</button>
                    <p>{message}</p>
                </div>
            )
        }
        </>
    )

}