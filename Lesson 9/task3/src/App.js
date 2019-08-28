import React from 'react';
import './App.css';
import {useJsonFetch} from './hooks/useJsonFetch';
import {LoginForm} from './components/LoginForm';
import {ProfileForm} from './components/ProfileForm';
import {News, New} from './components/News';
import { Message } from './components/Message';
import { Loading } from './components/Loading';
import {NotFound} from './components/NonFound';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

function App() {

  
  

  const [news, setNews] = React.useState([]);
  const [redirect, setRedirect] = React.useState('');
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');
  const [profile, setProfile] = React.useState(JSON.parse(localStorage.getItem('profile') || '{}') );
  const [action, setAction] = React.useState({
    path:'',
    postData: null,
  });

  React.useEffect( () => {
    if (token){
      setAction({path:'/private/me'});
    }
    return () => {};
  }, []);

  const [data, isLoading, hasError] = useJsonFetch(
    process.env.REACT_APP_ROOT_URL,
    {
      cache: 'no-cache',
      referrer: 'no-referrer',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
    },
    action.postData,
    action.method,
    (data, isLoading, hasError) => {
      const {path: act, method} = action;
      setAction({
        path:'',
        postData: null,
      });
      setRedirect('');

      switch (act){
        case '/auth':
          (data) && (
            handleSetToken(data.token) || 
            setAction({path:'/private/me'}) ||
            setRedirect('/news') );
          break;
        case '/private/me':
          debugger;
          if (data){
            handleSetProfile(data);
            setAction({path:'/private/news'});
          }
          break;
        case '/private/news':
          if (data){
            handleSetNews(data);
          }
          break;
        default:
          break;
      }
    },
    [action.path]
  );

  const handleSetToken = (token) => {
    localStorage.setItem('token', token); 
    setToken(token);
  }

  const handleSetProfile = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile)); 
    setProfile(profile);
  }

  const handleSetNews = (news) => {
    setNews(news);
  }

  const handleLogin = (login, password) => {
    setAction({
      path: '/auth',
      postData: {
        "login": login, 
        "password": password
      }
    });
  }

  const handleLogout = (userId) => {
    handleSetToken(''); 
    handleSetProfile('');
  }

  return (
    <Router>
      <div className="App">
        <Loading isLoading={isLoading} />
        <Message message={hasError && hasError.message} isHide={!hasError} />
        {
          (redirect) && (<Redirect to={redirect} />)
        }
        {
          (!token) && (<Redirect to='/' />)
        }
        <Switch>
        {
          (!token) && <Route exact path="/" render={ (props) => {
            return (
              <LoginForm handleLogin={handleLogin} />
            );
          } } />
        }
        {
          (news.length > 0) && (
            <Route exact path="/new/:id" render={ ({match}) => {
              let newy = news.filter( (item) => { return item.id === match.params.id})[0];
              return (newy && (
                <New {...newy} mode={"view"} />
              )) || (<NotFound />);
            } } />
          )
        }
        
        <Route path="/" render={ (props) => {
            return (
              <>
                <ProfileForm user={profile} handleLogout={handleLogout} />
                <News news={news} />
              </>
            );
          } } />
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
