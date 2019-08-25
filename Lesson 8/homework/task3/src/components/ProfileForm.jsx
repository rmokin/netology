import React from 'react';

export function ProfileForm(props){

    const {handleLogout, user} = props;

    return (
        <div className="profile-form">
            <h2>Pedro Social</h2>
            <div className="profile-content">
                <img src={user.avatar} width="40" alt={`avatar for ${user.name}`} />
                <h5>{user.name}</h5>
                <button onClick={ (evt) => {evt.preventDefault(); handleLogout(user.id); } }>Logout</button>
            </div>
            
        </div>
    );

} 