import React from 'react';
//import{useState,useEffect,useRef} from'react';

export function useJsonFetch(url, opt, callback, [action]){
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

        const fetchData = async () => {
            setResult(null,true, null);
            /*setLoading(true);
            setData(null);
            setError(null);
            */
            try{
                debugger;
                const response = await fetch(url + action, 
                    {
                        ...opt, 
                    });
                if (!response.ok){
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setResult(data,false, null, callback);
                //setData(data);
            }
            catch(e){
                //debugger;
                setResult(null,false, e, callback);
                //setError(e);
            }
            finally{
                //setLoading(false);
            }
            //debugger;
            //callback(data,isLoading,hasError);
        };
        
        if (!isLoading && action){
            fetchData();
        }
        return () => {};
    }, [action]);
    return [data,isLoading,hasError];
}