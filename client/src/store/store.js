
import axios from 'axios';
import {makeAutoObservable} from 'mobx'
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';


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
    async changeNickname(nickname) {
        this.user.nickname = nickname
    }
    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);

            if(response.data.success) {
                localStorage.setItem('token', response.data.userData.accessToken);
                localStorage.setItem('userData', JSON.stringify(response.data.userData))
                this.setAuth(true);
                this.setUser(response.data.userData.userData);
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
                localStorage.setItem('userData', JSON.stringify(response.data.userData))
                /*this.setAuth(true);
                this.setUser(response.data.userData.message);*/
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
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e)
        }
    }

    /*async checkAuth2() {
        if(localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token')) {
            console.log(JSON.parse(localStorage.getItem('userData')).userData)
            this.user = JSON.parse(localStorage.getItem('userData')).userData;
            this.isAuth = true        
        }
        else {
            this.user = {}
            this.isAuth = false
        }

    }*/
    async checkAuth3() {
        //console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token')) {
            const response = await UserService.getOneUser(JSON.parse(localStorage.getItem('userData')).userData.id);
            //console.log(response.data)
            if(response.data.isActivated) {
                //console.log(response.data)
                this.user = response.data
                this.isAuth = true   
            }
            else {
                this.user = {}
                this.isAuth = false
            }
        }
    }
    async checkAuth() {
        try {
            //console.log(this.isAuth)
            const response = await axios(`${process.env.REACT_APP_SERVER_URL}/auth/refresh`, {withCredentials: true});
            //console.log(response)
            if(response.data.success) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);                
            }
  
        } catch (error) {
            console.log(error)    
        }
    }   
    async updateUser() {
        try {
            const {id} = this.user;
            const response = await UserService.getOneUser(id);
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify({userData: {
                id: response.data.id,
                avatarImg: response.data.avatarImg, 
                ban: response.data.ban, 
                email: response.data.email, 
                nickname: response.data.nickname, 
                role: response.data.role, 
                score: response.data.score, 
                aboutMe: response.data.aboutMe,
                userQuestions: response.data.userQuestions,
                userAnswers: response.data.userAnswers
            }}))
            this.setUser(JSON.parse(localStorage.getItem('userData')).userData)
            return response.data
        } catch (error) {
            
        }
    }

}
