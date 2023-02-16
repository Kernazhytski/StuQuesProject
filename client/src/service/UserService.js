import $api from '../http/index';

export default class UserService {
    static async getAllUsers() {
        return $api.get('/users/getAllUsers')
    }
    static async getOneUser() {
        return $api.get('/users/:id')
    }
    static async editProfile(userId) {
        return $api.get(`/users/editUser/${userId}`)
    }
}
