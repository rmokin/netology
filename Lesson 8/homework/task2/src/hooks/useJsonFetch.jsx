import React from 'react';
//import{useState,useEffect,useRef} from'react';

export default function useJsonFetch(url, opt, dep){
    const[data, setData]=React.useState(null);
    const[isLoading, setLoading]=React.useState(false);
    const[hasError, setError]=React.useState(null); 

    React.useEffect( () => {
        
        const fetchData = async () => {
            setLoading(true);
            setData(null);
            setError(null);
            
            try{
                const response = await fetch(url + dep[0], opt);
                if (!response.ok){
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setData(data);
            }
            catch(e){
                setError(e);
            }
            finally{
                setLoading(false);
            }
        };
        
        if (!isLoading && dep[0]){
            fetchData();
        }
        return () => {};
    }, dep);
    return[data,isLoading,hasError];
}