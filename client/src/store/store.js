
import axios from 'axios';
import {makeAutoObservable} from 'mobx'
import AuthService from '../service/AuthService';

export default class Store {
    user = {};
    isAuth = false;
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(isAuth) {
        this.isAuth = isAuth;
    }
    setUser(user) {
        this.user = user;
    }
    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e)
        }
    }
    async register(email, password, nickname) {
        try {
            const response = await AuthService.register(email, password, nickname);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e)
        }
    }
    async logout(email, password, nickname) {
        try {
            const response = await AuthService.logout(email, password, nickname);
            localStorage.removeItem(response.data.accessToken);
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        try {
            const response = await axios(`${process.env.REACT_APP_SERVER_URL}/refresh`, {whithCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            
        }
    }
}
