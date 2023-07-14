import axios from 'axios';
import $api from '../http';

const host = 'localhost:9005'
export default class DataService{
    

    static async getCardWhy(){
        const response = await axios.get(`http://${host}/user/get-all-actives-cards`);
        console.log('uqweruwqr');
        return response;
    }
    static async getTrainingCalendar(){
        return await $api.get(`http://${host}/api/v1/train/get-calendar-by-sport-complex`);
    }
    static async postRegister(obj){
        return await $api.post(`/api/v1/auth/register`, obj);
    }
    static async postLogin(obj){
        return await $api.post(`/api/v1/auth/login`, obj);
    }
}
