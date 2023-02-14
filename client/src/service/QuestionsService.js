import $api from '../http/index';

export default class QuestionsServise {
    static async getAllQuestions() {
        return $api.get('/questions/getAllQuestions')
    }
    static async getMyQuestions(email, password, nickname) {
        return $api.get('/questions/getMyQuestion')
    }
    static async logout() {
        return $api.post('/auth/logout')
    }
}   