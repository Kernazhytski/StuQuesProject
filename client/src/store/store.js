
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

            if(response.data.success) {
                localStorage.setItem('token', response.data.userData.accessToken);
                localStorage.setItem('userData', JSON.stringify(response.data.userData))
                this.setAuth(true);
                this.setUser(response.data.userData.message);
                return {
                    success: true
                }                
            }
            return {
                success: false,
                message: response.data.message,
                problem: response.data.problem
            }   

        } catch (e) {
            console.log(e)
        }
    }
    async register(email, password, nickname) {
        try {
            const response = await AuthService.register(email, password, nickname);
            if(response.data.success) {
                localStorage.setItem('token', response.data.userData.accessToken);
                this.setAuth(true);
                this.setUser(response.data.userData.message);
                return {
                    success: true
                }              
            }
            return {
                success: false,
                message: response.data.message,
                problem: response.data.problem
            }    
        } catch (e) {
            console.log(e)
        }
    }
    async logout(email, password, nickname) {
        try {
            const response = await AuthService.logout(email, password, nickname);
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            //localStorage.removeItem()
            //console.log(this.isAuth)
            this.setAuth(false);
            //console.log(this.isAuth)
            this.setUser({});
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth2() {
        if(localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token')) {
            this.user = JSON.parse(localStorage.getItem('userData')).userData;
            this.isAuth = true        
        }
        else {
            this.user = {}
            this.isAuth = false
        }

    }

    async checkAuth() {
        try {
            console.log(this.isAuth)
            const response = await axios(`${process.env.REACT_APP_SERVER_URL}/auth/refresh`, {withCredentials: true});
            console.log(response)
            if(response.data.success) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);                
            }
  
        } catch (error) {
            
        }
    }

}
