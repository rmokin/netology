import React from 'react';
import {useJsonFetch} from './hooks/useJsonFetch';
import {Posts,AddEditPost, Post} from './components/Posts';
import {Loading} from './components/Loading';
import {Message} from './components/Message';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"; 
import './App.css';

function App() {

  const [posts, setPosts] = React.useState([]);
  const [redirect, setRedirect] = React.useState('');
  const [action, setAction] = React.useState({
    path:'',
    postData: null,
    method: '',
  });

  const [data, isLoading, hasError] = useJsonFetch(
    process.env.REACT_APP_ROOT_URL,
    {
      cache: 'no-cache',
      referrer: 'no-referrer',
      headers: {
          'Content-Type': 'application/json',
      }
    },
    action.postData,
    action.method,
    (data, isLoading, hasError) => {
      const {path: act, method} = action;
      setAction({
        path:'',
        postData: null,
        method: '',
      });
      setRedirect('');

      switch (act){
        case '/posts':
          (data) && setPosts(data.posts.reverse());
          break;
        default:
          (data) && (setAction({path:'/posts'}) || setRedirect('/posts'));
          break;
      }

      if (method === 'DELETE'){
        setAction({
          path:'/posts',
        });
      }

      

    },
    [action.path]
  );

  React.useEffect( () => {
    
    setAction({
      path:'/posts',
      postData: null,
    });

    return () => {};
  },[])

  const handleDelete = (id) => {
    setAction({
      path:`/post/${id}`,
      postData: null,
      method: 'DELETE',
    });
  };

  const handleAddEdit = (id, content) => {
    debugger;
    const postId = id || '0';
    setAction({
      path:`/posts/${postId}`,
      postData: {
        content: content
      },
    });
  };

  return (
    <Router>
      <div className="main-container">
        <Loading isLoading={isLoading} />
        <Message message={hasError && hasError.message} isHide={!hasError} />
        {
          (redirect) && (<Redirect to={redirect} />)
        }
        <Switch>
          <Route exact path="/post/new" render={ ({props}) => {
            return (
              <AddEditPost handleChange={handleAddEdit}  />
            );
          } } />
          <Route exact path="/post/:id/edit" render={ ({match}) => {
            let post = posts.filter( (item) => { return item.id === match.params.id})[0];
            return post && (
              <AddEditPost id={post.id} text={post.content} handleChange={handleAddEdit}  />
            );
          } } />
          <Route exact path="/post/:id" render={ ({match}) => {
            let post = posts.filter( (item) => { return item.id === match.params.id})[0];
            return post && (
              <Post {...post} handleDelete={handleDelete}/>
            );
          } } />
          <Route path="/" render={ (props) => { 
            return (
              <>
                <Link  to="/post/new">New</Link>
                <Posts posts={posts} handleDelete={handleDelete}></Posts>
              </>
            );
          } } />
          
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
