import axios from 'axios';

export default class DataService{
    // host = '192.168.205.6:9005'

    static async getCardWhy(){
        const response = await axios.get(`http://192.168.205.6:9005/user/get-all-actives-cards`);
        console.log('uqweruwqr');
        return response;
    }
}