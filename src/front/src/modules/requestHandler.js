import statusHandler from './statusHandler';
import axios from 'axios';

axios.interceptors.response.use(
    function (response) {
        statusHandler.handleSuccess(response);
        return response;
    }, 
    function (error) {
        statusHandler.handleError(error.response);
        return Promise.reject(error);
    }
);

const Requester = class Requester {

    constructor(url) {
        this.base = import.meta.env.VITE_BACK_BASE_URL;
        this.url = url;
        this.token = localStorage.getItem('token') || null;
    }

    async request(method, data, params) {
        let payload = new URLSearchParams(params);
        let config = {
            'method': method,
            'baseURL': this.base,
            'url': this.url,
            'headers': {
                'Authorization': `Basic ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            'data': data
        };

        if (payload.size > 0) { config['url'] += `?${payload}`; };

        let ret;
        await axios(config)
        .then((response) => {
            if (method == 'get') ret = response.data;
            else ret = response;
        })
        .catch((error) => {
            ret = error.response;
        });

        return ret;
    }

    async get(params = {}) {
        return this.request('get', {}, params);
    }

    async post(data = {}, params = {}) {
        return this.request('post', data, params);
    }

    async patch(data = {}, params = {}) {
        return this.request('patch', data, params);
    }

    async delete(data = {}, params = {}) {
        return this.request('delete', data, params);
    }

};

export default { Requester };