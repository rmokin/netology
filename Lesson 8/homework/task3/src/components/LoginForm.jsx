import React from 'react';

export function LoginForm(props){

    const {handleLogin} = props;
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            handleLogin(login,password);
        }
    }

    return (
        <div className="login-form">
            <h2>Pedro Social</h2>
            <div className="profile-content">
                <input type="text" placeholder="login" onKeyDown={handleKeyDown} onChange={(evt) => {setLogin(evt.target.value)} } />
                <input type="password" placeholder="password" onKeyDown={handleKeyDown} onChange={(evt) => {setPassword(evt.target.value)} } />
                <button onClick={ (evt) => {evt.preventDefault(); handleLogin(login,password); } }>Login</button>
            </div>
        </div>
    );

} 