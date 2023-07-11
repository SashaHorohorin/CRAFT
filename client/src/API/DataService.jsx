import axios from 'axios';

const host = 'localhost:9005'
export default class DataService{
    

    static async getCardWhy(){
        const response = await axios.get(`http://${host}/user/get-all-actives-cards`);
        console.log('uqweruwqr');
        return response;
    }
    static async postRegister(obj){
        return await axios.post(`http://${host}/api/v1/auth/register`, obj);
    }
    static async postLogin(obj){
        const response = await axios.post(`http://${host}/api/v1/auth/login`, obj);
    }
}