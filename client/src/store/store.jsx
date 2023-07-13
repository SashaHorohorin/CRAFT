import {makeAutoObservable} from 'mobx'
import DataService from '../API/DataService';
import axios from 'axios';
import $api from '../http';

const HOST = "http://localhost:9005";
export default class Store{
    user = '';
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
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('roles', response.data.roles);
            this.setAuth(true);
            this.setUser(response.data.username);

            console.log(this.user);
        } catch (error) {
            // console.log(error);
            console.log(error?.response?.data?.message);
        }
    }
    async registration(obj){
        try {
            const response = await DataService.postRegister(obj);
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