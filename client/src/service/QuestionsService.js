import $api from '../http/index';

export default class QuestionsServise {
    static async getAllQuestions(search, subject, limit, page) {
        return $api.get('/question/list', {
            params: {
                titleSearch: search,
                sub: subject,
                limit,
                page
            }
        })
    }

    static async getMyQuestions(id, limit , page,search, subject) {
        return $api.get('/question/getMyQuestion', {
            params: {
                id, 
                limit,
                page,
                search,
                subject
            }
        })
    }

    static async addQuestion(files, title, description, subject, userId) {
        const filedata = new FormData()
        files.forEach(file => filedata.append('file', file, file.name))
        filedata.append('title', title)
        filedata.append('description', description)
        filedata.append('subject', subject)
        filedata.append('userId', userId)
        return $api.post('/question/add', filedata)
    }

    static async addAnswer(text,questionId,userId,files){
        const filedata = new FormData()
        files.forEach(file => filedata.append('file', file, file.name))
        filedata.append('text',text)
        filedata.append('questionId',questionId)
        filedata.append('userId',userId)
        return $api.post('/question/addAnswer',filedata)
    }

    static async getQuestion(id) {
        return $api.get('/question/getQuestion/' + id)
    }

    static async delQuestion(id){
        return $api.post('/question/delete',{id})
    }

    static async getAnswers(id){
        return $api.post('/question/getAnswers',{id})
    }

    static async deleteAnswer(id){
        return $api.post('/question/deleteAnswers',{id})
    }

    static async setBest(id){
        return $api.post('/question/setBestAnswer',{id})
    }

    static async getMyAnswers(id, limit , page,search, subject){
        return $api.get('/question/getMyAnswers',{
            params: {
                id, 
                limit,
                page,
                search,
                subject
            }
        })
    }
}   