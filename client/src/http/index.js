import axios from "axios";

const HOST = "http://localhost:9005";

const $api = axios.create({ 
    withCredentials: true, 
    baseURL: HOST
});

$api.interceptors.request.use((config) => {
    if (localStorage?.getItem('accessToken') !== null){
        config.headers.Authorization = `Bearer_${localStorage.getItem('accessToken')}`;
    }
    return config;
    
})

export default $api;
