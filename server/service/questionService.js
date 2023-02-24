const {Question, Answer} = require('../models');

require('dotenv').config();

class QuestionService {
    async getUserQuestions(userId) {
        const userQuestions = await Question.findAll({where: {userId}});
        return userQuestions
    }
    async getUserAnswers(userId) {
        const userAnswers = await Answer.findAll({where: {userId}});
        return userAnswers
    }
}

module.exports = new QuestionService()