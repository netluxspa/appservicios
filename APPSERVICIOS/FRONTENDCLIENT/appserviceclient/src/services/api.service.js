import BaseRequestModel from "../utils/base-request-model";
// import {Headers} from '../config/headers';


const headers = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
}

export const ApiService = {
    // get request
    get: (route, params) => {
        console.log('params from ApiService', params)
        const newBase = new BaseRequestModel(route, 'GET', headers, params, null);
        return newBase.request();
    },
    put: (route, form) => {
        const newBase = new BaseRequestModel(route, 'PUT', headers, null , form);
        return newBase.request();
    },
    post: (route, form) => {
        console.log('Form from api service', form)
        const newBase = new BaseRequestModel(route, 'POST', headers, null, form);
        return newBase.request();
    },

};