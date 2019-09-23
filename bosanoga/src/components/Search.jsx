import React from 'react';
import {useDispatch,useSelector} from'react-redux';
import {setSearch,upSearch} from '../actions/actionCreators';


export default function Search(props){
    
    const {callback, className, value, onchange} = props;
    const {search: searchState} = useSelector(state => state.search);
    const [search, setSearchValue] = React.useState(value !== undefined ? value : searchState);
    const [timeoutId, setTimeoutId] = React.useState(0);
    const dispatch = useDispatch();
    const debounceTime = 1317;
    
    React.useEffect( () => {
        setSearchValue(value !== undefined ? value : searchState);
        return () => {};
    },[value]);

    const clearDebounce = () => {
        if (timeoutId){
            clearTimeout(timeoutId);
            setTimeoutId(0);
        }
    }

    const debounce = (timeout, callback) => {
        if (timeoutId){
            clearTimeout(timeoutId);
            setTimeoutId(0);
        }
        if (timeout > 0){
            setTimeoutId(setTimeout( () => {callback()}, timeout));
        }
    }


    const onSearch = (search) => {
        debounce(0);
        dispatch(setSearch(search));
        callback && callback(search);
    }

    const onChange = (e) => {
        e.preventDefault(); 
        setSearchValue(e.target.value);
        dispatch(upSearch(search));
        onchange && onchange(e.target.value);
        debounce(debounceTime, () => {search && onSearch(search)});
        
    }

    return (
        <form className={className} onSubmit={(e) => {e.preventDefault(); return false;} }>
              <input 
                  className="form-control" 
                  placeholder="Поиск" 
                  value={search}
                  onKeyPress={(e) => {
                      if(e.key === 'Enter'){
                        onSearch(e.target.value);
                      }
                  }}
                  onChange={onChange} />
          </form>
    );
}