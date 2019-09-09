import {ofType} from'redux-observable';
import {of} from 'rxjs';
import {ajax} from'rxjs/ajax';
import {map,filter,debounceTime,switchMap,catchError} from 'rxjs/operators';
import * as types from '../actions/actionTypes';
import {fetchSearchRequest,fetchSearchSuccess,fetchSearchFailure,clearSearchField} from'../actions/actionCreators';

export const startSearchEpic = action$ => action$.pipe(
    ofType(types.CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    filter(search => search !==''),
    debounceTime(500),
    map((search) => fetchSearchRequest(search)),
);

export const clearSearchEpic = action$ => action$.pipe(
    ofType(types.CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    filter(search => search ===''),
    map(() => {return clearSearchField()})
);

/*
export const changeSearchEpic = action$ => action$.pipe(
    ofType(types.CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    
    filter(search => search !==''),
    debounceTime(100),
    
    
    
    map( o => {
        return o.length > 0 
            ? concat(
                debounceTime(100),
                map(search => fetchSearchRequest(search))
            )
            : map(search => clearSearchField(search))
    })
    

);
*/
export const searchEpic = action$ => action$.pipe(
    ofType(types.FETCH_SEARCH_REQUEST),
    map(o => o.payload.search),
    switchMap(search => {return ajax.post(
        `${process.env.REACT_APP_ROOT_URL}/search`, 
        {
            name: search
        }, 
        {
            'Content-Type': 'application/json',
        }).pipe(
            map(({response: items}) => { return fetchSearchSuccess(items)}),
            catchError(message => of(fetchSearchFailure(message)))
        )}
    ),
);