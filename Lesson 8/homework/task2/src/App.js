import React from 'react';
import useJsonFetch from './hooks/useJsonFetch';
import classNames from 'classnames';
import './App.css';

function App() {
  const [test, setTest] = React.useState('');
  const [data, isLoading, hasError] = useJsonFetch(
    process.env.REACT_APP_ROOT_URL,
    {
      cache: 'no-cache',
      method: 'GET',
      referrer: 'no-referrer',
    },
    [test]
  );
  return (
    <div className="App">
      <div className="tests">
        <ul>
          <li className={classNames({
            "active": test === "/data"
          })}>
            <a href="/data" onClick={(evt) => {evt.preventDefault(); setTest(evt.target.getAttribute("href")); }}>
              Test data
            </a>
          </li>
          <li className={classNames({
            "active": test === "/data"
          })}>
            <a href="/loading" onClick={(evt) => {evt.preventDefault(); setTest(evt.target.getAttribute("href")); }}>
              Test isLoading
            </a>
          </li>
          <li className={classNames({
            "active": test === "/data"
          })}>
            <a href="/error" onClick={(evt) => {evt.preventDefault(); setTest(evt.target.getAttribute("href")); }}>
              Test hasError
            </a>
          </li>  
        </ul>
      </div>
      <div className="results">
        {
          (data && `Data: ${JSON.stringify(data)}`) ||
          (isLoading && 'Loading...') ||
          (hasError && `Error: ${hasError.message}`)
        }
      </div>
    </div>
  );
}

export default App;
