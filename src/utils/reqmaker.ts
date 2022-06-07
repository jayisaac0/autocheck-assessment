import dotenv from 'dotenv';
import moment from 'moment-timezone';
import axios, { AxiosRequestHeaders, Method } from 'axios';
import Responses from '../utils/responses';

dotenv.config({ path: __dirname + '/../../.env' });
const environment = process.env.NODE_ENV!;
const services = require('../../config/url.json')[environment].services;
type Apis = 'external';

interface Reqmaker {
    service?: Apis;
    action: string;
    method: Method;
    data?: any;
    headers?: AxiosRequestHeaders;
}

export default function ({
    service,
    action,
    method,
    data = '',
    headers = { 'Content-Type': 'application/json' },
}: Reqmaker) {
    return new Promise((resolve, reject) => {
        if (environment !== 'test') {
            const url =
                services.find((el: { name: string }) => el.name === service).url + '/' + action;
            const now = moment.tz(moment(), 'Africa/Nairobi').format('DD/MM/YYYY HH:mm');
            console.log(`${now} - ${url}`);
            axios({
                url: url,
                method: method,
                headers: headers,
                data: data,
            })
                .then((response) => {
                    console.log(response.status);
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.status);
                        reject(error.response.data);
                    } else if (error.request) {
                        console.log('Server conection failed');
                        reject(Responses.errorResponses('Could not reach server', []));
                    } else {
                        console.log('Error', error.message);
                        reject(Responses.errorResponses('Unknown request error', []));
                    }
                });
        } else {
        }
    });
}
