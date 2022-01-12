var API_URL="http://ducideas-001-site1.ftempurl.com/";
export function fetchApi(endpoint:string, method:string='GET', body?:Object){
    const canHaveBody: boolean = method !== 'GET';
    if (!canHaveBody && body !== undefined) {
        throw 'GET request cannot have body.';
    }

    let headers= {
        'Accept': 'application/json',
        'Content-Type' :''
    };

    if (canHaveBody) {
        headers['Content-Type'] = 'application/json';
    }

    return fetch(API_URL+endpoint,{
        credentials:'include',
        headers,
        method:method,
        body:JSON.stringify(body)
    } as any).then((response)=>{
        return response.json();
    })
}