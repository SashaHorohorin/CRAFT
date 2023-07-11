import {makeAutoObservable} from 'mobx'
import DataService from '../API/DataService';

export default class Store{
    user = {};
    isAuth = false;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user;
    }

    async login(obj){
        try {
            const response = await DataService.postLogin(obj);
            console.log(response);
            let saveObj = ({
                'accessToken': response.data.accessToken,
                'refreshToken': response.data.refreshToken,
                'username': response.data.username,
                'roles': response.data.roles,
            })
            localStorage.setItem(saveObj);
            this.setAuth(true);
            this.setUser(response.data.username);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    async registration(obj){
        try {
            const response = await DataService.postRegister(obj);
            console.log(response);
            let saveObj = ({
                'accessToken': response.data.accessToken,
                'refreshToken': response.data.refreshToken,
                'username': response.data.username,
                'roles': response.data.roles,
            })
            localStorage.setItem(saveObj);
            this.setAuth(true);
            this.setUser(response.data.username);
        } catch (error) {
            console.log(error?.message);
        }
    }
    // async logout(){
    //     try {
    //         const response = await DataService.postRegister(obj);
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         this.setUser(response.data.username);
    //     } catch (error) {
    //         console.log(error?.message);
    //     }
    // }
}