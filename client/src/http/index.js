import axios from "axios";

const HOST = "localhost:9005";

const $api = axios.create({ 
    withCredentials: true, 
    baseURL: HOST
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer_${localStorage.getItem('accessToken')}`;
    return config;
})

export default $api;
