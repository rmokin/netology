import React from 'react';

export function Message(props){

    const {message, isHide} = props;
    const [hide, setHide] = React.useState(false);
    
    React.useEffect ( () => {
        setHide(isHide);
        return () =>{ setHide(false)} ;
    },[message])

    return (
        <>
        {
            !hide && message && (
                <div className="message">
                    <button onClick={ (evt) => { evt.preventDefault(); setHide(true);} }>X</button>
                    <p>{message}</p>
                </div>
            )
        }
        </>
    )

}