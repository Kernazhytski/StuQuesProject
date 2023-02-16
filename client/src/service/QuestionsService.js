import $api from '../http/index';

export default class QuestionsServise {
    static async getAllQuestions() {
        return $api.get('/question/list')
    }
    static async getMyQuestions(email, password, nickname) {
        return $api.get('/question/getMyQuestion')
    }
    static async addQuestion(email, password, nickname) {
        return $api.post('/question/getMyQuestion')
    }
    static async logout() {
        return $api.post('/auth/logout')
    }
}   