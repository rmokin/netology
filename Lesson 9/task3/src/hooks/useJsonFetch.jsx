import React from 'react';

export function useJsonFetch(url, opt, postData, method, callback, [action]){
    const[data, setData]=React.useState(null);
    const[isLoading, setLoading]=React.useState(false);
    const[hasError, setError]=React.useState(null); 

    React.useEffect( () => {
        
        const setResult = (data, loading, error, callback) => {
            if (typeof data !== 'undefined'){
                setData(data);
            }
            if (typeof loading !== 'undefined'){
                setLoading(loading);
            }
            if (typeof error !== 'undefined'){
                setError(error);
            }
            if (callback){
                callback(data,loading,error);
            }
        }
        
        const fetchData = async (url, opt, callback) => {
            setResult(null, true, null);
            
            try{
                const response = await fetch(url, 
                    {
                        ...opt, 
                        method: method || ((postData) && 'POST') || 'GET',
                        body: ((postData) && JSON.stringify(postData)) || (undefined),
                    });
                if (!response.ok){
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setResult(data,false, null, callback);
            }
            catch(e){
                setResult(null,false, e, callback);
            }
            finally{
                
            }
        };
        
        if (!isLoading && action){
            fetchData(url + action, opt, callback);
        }
        return () => {};
    }, [action]);
    return [data, isLoading, hasError];
}