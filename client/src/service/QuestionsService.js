import $api from '../http/index';

export default class QuestionsServise {
    static async getAllQuestions(search, subject) {
        return $api.get('/question/list', {
            params: {
                titleSearch: search,
                sub: subject
            }
        })
    }

    static async getMyQuestions(email, password, nickname) {
        return $api.get('/question/getMyQuestion')
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


    static async getQuestion(id){
        return $api.get('/question/getQuestion/'+id)
    }
}   