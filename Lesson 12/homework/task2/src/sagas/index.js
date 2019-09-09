import {put,spawn, call,takeLatest} from'redux-saga/effects';
import {fetchServicesSuccess, fetchServiceSuccess, fetchServicesFailure, fetchServiceFailure} from'../actions/actionCreators';
import * as types from'../actions/actionTypes';



function* handleServicesRequestSaga(){
    try{
        const items = yield call(fetchRequest,`${process.env.REACT_APP_ROOT_URL}/services`);
        yield put(fetchServicesSuccess(items));
    }
    catch(e){
        yield put(fetchServicesFailure(e.message));
    }
    
}

function* watchServicesRequestSaga(){
    yield takeLatest(types.FETCH_SERVICES_REQUEST, handleServicesRequestSaga);
}

function* handleServiceRequestSaga({payload:{serviceId}}){
    try{
        const item = yield call(fetchRequest,`${process.env.REACT_APP_ROOT_URL}/services/${serviceId}`);
        yield put(fetchServiceSuccess(item));
    }
    catch(e){
        yield put(fetchServiceFailure(e.message));
    }
    
}

function* watchServiceRequestSaga(){
    yield takeLatest(types.FETCH_SERVICE_REQUEST, handleServiceRequestSaga);
}

export const fetchRequest = async(url, data) => {
    const response= await fetch(
        url,
        {
            cache: 'no-cache',
            referrer: 'no-referrer',
            method: (data && 'POST') || 'GET',
            headers: {
                ...( ((data) && {'Content-Type': 'application/json'}) || {})
            },
            body: ((data) && JSON.stringify (data)) || undefined
        }
    );
    if (!response.ok){
        throw new Error(response.statusText);
    }
    return await response.json();
}

export default function* saga(){
    yield spawn(watchServicesRequestSaga);
    yield spawn(watchServiceRequestSaga);
}


// workerfunction*handleChangeSearchSaga(action){yieldput(searchSkillsRequest(action.payload.search));}// watcherfunction*watchChangeSearchSaga(){yielddebounce(100,filterChangeSearchAction,handleChangeSearchSaga);}