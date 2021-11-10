import { Observable } from "rxjs";


const prod = {
    url: {
     API_URL: 'https://apiappservice.netlux.cl',
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8000'
    }
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

const baseUrl = config.url.API_URL;

export default class BaseRequestModel {
    constructor(url, method, headers, params, body) {
        this.url = url;
        this.method = method || "GET";
        this.headers = headers || {};
        this.params = params || {};
        this.body = body || {};
    }

    request = () =>{
        return new Observable(observer => {
            const controller = new AbortController();
            const { signal } = controller;
            fetch(`${baseUrl}${this.url}?` + new URLSearchParams(this.params),
                {
                    method: this.method,
                    headers: this.headers,
                    body: this.method === 'GET' ? null : this.body,
                    signal: signal
                })
                .then(r=>{
                    if (r.ok){
                        return r.json().then(r=>{observer.next(r); observer.complete()})
                    } else {
                        return r.json().then(r=>{observer.error(r)})
                    }
                })
                .catch(e => {
                    observer.error({'error': ['Compruebe conexión a internet.']});
                })
            return ()=>{
                controller.abort();
            }
        });
    }
}