const { Question } = require('../models');

class QuestionsController {
    async add(req, res) {
        const question = Question.create(req.body)
        res.send("Successfuly added a question")
    }

    async list(req, res) {
        res.send(await Question.findAll()).json
    }
}

module.exports = new QuestionsController()