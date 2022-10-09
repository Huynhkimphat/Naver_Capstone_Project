import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {
        'content-type': 'application/json',
    }
})

