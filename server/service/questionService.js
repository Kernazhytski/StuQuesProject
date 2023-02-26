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
    async deleteUserQuestions(userId) {
        const userQuestions = await Question.findAll({where: {userId}});
        userQuestions.forEach(userQuestion => {
            userQuestion.destroy()
        });
        return userQuestions
    }
    async deleteUserAnswers(userId) {
        const userAnswers = await Answer.findAll({where: {userId}});
        userAnswers.forEach(userAnswer => {
            userAnswer.destroy()
        });
        return userAnswers 
    }
}

module.exports = new QuestionService()