const root = 'http://localhost:7777';

function callMessages(path, callback, data, type){
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

export function listMessages(callback, from){
    callMessages('/messages' + (from ? '?from=' + from : ''), callback);
}

export function sendMessage(callback,message){
    callMessages('/messages',callback,message);
}

export function sayHello(callback, secret){
    callMessages('/hello',callback, {secret: secret});
}