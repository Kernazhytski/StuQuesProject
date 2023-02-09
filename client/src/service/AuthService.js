import $api from '../http/index';

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth/login', {email, password})
    }
    static async register(email, password, nickname) {
        return $api.post('/auth/register', {email, password, nickname})
    }
    static async logout() {
        return $api.post('/auth/logout')
    }
}   