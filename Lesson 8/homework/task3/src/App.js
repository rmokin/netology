import React from 'react';
import './App.css';
import {useJsonFetch} from './hooks/useJsonFetch';
import {LoginForm} from './components/LoginForm';
import {ProfileForm} from './components/ProfileForm';
import {News} from './components/News';
import { Message } from './components/Message';

function App() {

  const [postData, setPostData] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');
  const [action, setAction] = React.useState('');
  const [profile, setProfile] = React.useState(localStorage.getItem('profile') || null );
  const [news, setNews] = React.useState(null );

  const handleSetToken = (token) => {
    localStorage.setItem('token', token); 
    setToken(token);
  }

  const handleSetProfile = (profile) => {
    localStorage.setItem('profile', profile); 
    setProfile(profile);
  }

  const handleSetNews = (news) => {
    debugger;
    setNews(news);
  }

  const [data, isLoading, hasError] = useJsonFetch(
    process.env.REACT_APP_ROOT_URL,
    {
      cache: 'no-cache',
      referrer: 'no-referrer',
      method: ((postData) && 'POST') || 'GET',
      body: ((postData) && JSON.stringify(postData)) || (undefined),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
    },
    (data, isLoading, hasError) => {
      const act = action;
      setAction('');
      setPostData(null);
      
      switch (act){
        case '/auth':
          if (data){
            handleSetToken(data.token);
            setAction('/private/me');
          }
          break;
        case '/private/me':
          if (data){
            handleSetProfile(data);
            setAction('/private/news');
          }
          break;
        case '/private/news':
          if (data){
            handleSetNews(data);
          }
          break;
      }
    },
    [action]
  );
  
  /*
  switch (action){

    case '':
      if (token) setAction('/private/me')
      break;
    case '/private/me':
      setAction('/private/news');
      break;
    case '/auth':
      if (data){
        localStorage.setItem('token', data.token); 
        setToken(data.token);
      setAction('/private/me');
      }
  }
*/
  
  React.useEffect( () => {
    if (token){
      setAction('/private/me');
    }
    return () => {};
  }, []);

  const handleLogin = (login, password) => {

    setPostData({
      "login": login, 
      "password": password
    });
    setAction('/auth');
  }

  const handleLogout = (userId) => {

    handleSetToken(''); 
    handleSetProfile('');
    handleSetNews(null);

  }

  
  return (
    <div className="App">
      {
        <>
          {
            (isLoading && <div className="loading">Loading...</div>)
          }
          {
            (!token && <LoginForm handleLogin={handleLogin} />)
          }
          {
            (hasError && <Message message={hasError.message} />)
          }
          {
            (profile && <ProfileForm user={profile} handleLogout={handleLogout} />)
          }
          {
            (news && <News news={news} />)
          }
        </>
      }
    </div>
  );
}

export default App;
