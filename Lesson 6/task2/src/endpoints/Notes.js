const root = 'http://localhost:7777';

function callNotes(path, callback, data, type){
    fetch(`${root}${path}`,{
        cache: 'no-cache',
        method: type || (data && 'POST') || 'GET',
        referrer: 'no-referrer',
        headers: (data && {
            'Content-Type': 'application/json',
        }),
        body: (data && JSON.stringify(data)),
    })
        .then((response) => {return response.json()})
        .then((json) => {
            callback(json || {});
        })
}

export function listNotes(callback){
    callNotes('/notes',callback);
}

export function addNote(callback,note){
    callNotes('/notes',callback,note);
}

export function delNote(callback,id){
    callNotes(`/notes/${id}`,callback, undefined, 'DELETE');
}