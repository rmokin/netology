import {take,put,spawn, call, debounce, takeLatest} from'redux-saga/effects';
import {fetchSearchRequest, clearSearchField, fetchSearchSuccess, fetchSearchFailure} from'../actions/actionCreators';
import * as types from'../actions/actionTypes';


function filterChangeSearchAction({type,payload}){
    return type === types.CHANGE_SEARCH_FIELD
}


function* debouncedChangeSearchSaga({payload: {search}}){
    if (search === ''){
        yield put(clearSearchField());
    }
    else{
        yield put(fetchSearchRequest(search));
    }
    
}
function* watcherSearchSaga(){
    yield debounce(500, filterChangeSearchAction, debouncedChangeSearchSaga);

}

function* watchSearchSkillsSaga(){
    yield takeLatest(types.FETCH_SEARCH_REQUEST, handleSearchSaga);
}

function* handleSearchSaga({payload: {search}}){
    try{
        const items = yield call(searchRequest,search);
        yield put(fetchSearchSuccess(items));
    }
    catch(e){
        yield put(fetchSearchFailure(e.message));
    }
    
}

export const searchRequest = async(search) => {
    const response= await fetch(
        `${process.env.REACT_APP_ROOT_URL}/search`,
        {
            cache: 'no-cache',
            referrer: 'no-referrer',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
                name: search
            })
        }
    );
    if (!response.ok){
        throw new Error(response.statusText);
    }
    return await response.json();
}

export default function* saga(){
    yield spawn(watcherSearchSaga);
    yield spawn(watchSearchSkillsSaga);
}


// workerfunction*handleChangeSearchSaga(action){yieldput(searchSkillsRequest(action.payload.search));}// watcherfunction*watchChangeSearchSaga(){yielddebounce(100,filterChangeSearchAction,handleChangeSearchSaga);}