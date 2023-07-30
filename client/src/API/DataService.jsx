import axios from 'axios';
import $api from '../http';

const host = 'localhost:9005'
export default class DataService{
    

    static async getCardWhy(){
        const response = await axios.get(`http://${host}/user/get-all-actives-cards`);
        // console.log('uqweruwqr');
        return response;
    }
    static async getTrainingCalendar(){
        return await $api.get(`api/v1/train/get-calendar-by-sport-complex`);
    }
    static async postRegister(obj){
        return await $api.post(`/api/v1/auth/register`, obj);
    }
    static async postLogin(obj){
        return await $api.post(`/api/v1/auth/login`, obj);
    }
    static async postFollowTrain(obj, trainId){
        return await $api.post(`api/v1/train/${trainId}/add-user
        `, obj);
    }
    static async postUnFollowTrain(obj, trainId){
        return await $api.post(`api/v1/train/${trainId}/remove-user
        `, obj);
    }
    static async getEvents(countPage){
        return await $api.get(`api/v1/news?page=${countPage}&size=6`);
    }
    static async getPrice(sportComplex){
        return await $api.get(`/api/v1/price/get-by-sportcomplex/${sportComplex}`);
    }
    static async getСompetitions(){
        return await $api.get(`api/v1/competition/get-all`);
    }


}
