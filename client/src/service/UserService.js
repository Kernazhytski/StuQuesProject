import $api from '../http/index';

export default class UserService {
    static async getAllUsers() {
        return $api.get('/users/getAllUsers')
    }
    static async getOneUser(userId) {
        return $api.get(`/users/${userId}`)
    }
    static async editProfile(userId, file, nickname, descr) {
        const data = new FormData();
        console.log(file)
        data.append('file', file);
        data.append('nickname', nickname);
        data.append('aboutMe', descr);
        console.log(data)
        return $api.post(`/users/editUser/${userId}`, data)
    }
}
