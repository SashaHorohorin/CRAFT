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

$api.interceptors.response.use((config) => {
    return config;
}, (async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === 401){
        try {
            let objUser = {
                username: localStorage.getItem('username'),
                token: localStorage.getItem('refreshToken')
            }
            const response = await axios.post(`${HOST}/api/v1/auth/access-token`, objUser);
            localStorage.setItem('accessToken', response.data.token);
            return $api.request(originalRequest);
        } catch (error) {
            if(error.response.status === 400){
                localStorage.clear();
            }
            console.log('Не авторизован');
        }
    }else{
        return Promise.reject(error);
    }
}))

export default $api;
