import React from 'react';
import '../App.css';

export function Secret(props){
    const [secret, setSecret] = React.useState('');
    return (
        <div className="Secret">
            <h1>What is your secrect?</h1>
            <textarea className="secret-area" rows={5} cols={32} value={secret} onChange={ (e) => { setSecret(e.target.value); } }></textarea>
            <br/>
            <button disabled={secret.length === 0} onClick={(e)=>{
                const text = secret;
                e.preventDefault();
                setSecret('');
                props.handleSecret(text);
            }}>Tell them?</button>
        </div>
        
    );

}