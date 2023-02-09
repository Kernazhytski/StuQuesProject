import $api from '../http/index';

export default class UserService {
    async getAllUsers() {
        return $api.get('/getAllUsers')
    }
    async getOneUser() {
        return $api.get('/getOneUser')
    }
}
