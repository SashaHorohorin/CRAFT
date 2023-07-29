import {makeAutoObservable} from 'mobx'
import DataService from '../API/DataService';
import axios from 'axios';
import $api from '../http';

const HOST = "http://localhost:9005";
export default class Store{
    user = '';
    isAuth = Boolean(localStorage.getItem('username')) || false;
    isActivate = false;    
    messageError = ''
    flagError = false;


    constructor(){
        makeAutoObservable(this);
    }

    setFlagError(bool){
        this.flagError = bool;
    }

    setMessageError(error){
        this.messageError = error;
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user;
    }

    setActivate(bool){
        this.isActivate = bool;
    }

    async login(obj){
        try {
            const response = await DataService.postLogin(obj);
            // console.log(response + ' --try');
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('roles', response.data.roles);
            this.setAuth(true);
            this.setUser(response.data.username);

            // console.log(this.user);
        } catch (error) {
            console.log(error);
            this.setFlagError(false)
            setTimeout(()=> {
                this.setMessageError(error?.response?.data?.message)
                this.setFlagError(true);
            }, 500)
            
        }
    }
    async registration(obj){
        try {
            const response = await DataService.postRegister(obj);
            // console.log(response);
            // localStorage.setItem('activateCode', response.data.activateCode)
            // localStorage.setItem('accessToken', response.data.accessToken);
            // localStorage.setItem('refreshToken', response.data.refreshToken);
            // localStorage.setItem('username', response.data.username);
            // localStorage.setItem('roles', response.data.roles);
            this.setAuth(true);
            this.setUser(response.data.username);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    async checkAuth(){
        try {
            const response = await $api.get(`${HOST}/api/v1/auth/refresh`, {withCredentials: true});
            console.log(response);

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('roles', response.data.roles);

            this.setAuth(true);
            this.setUser(response.data.username);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    async logout(){
        try {
            // const response = await DataService.postRegister(obj);
            localStorage.clear();
            this.setAuth(false);
            this.setUser('');
        } catch (error) {
            console.log(error?.message);
        }
    }
}