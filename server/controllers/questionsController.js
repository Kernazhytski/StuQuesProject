const {Question, Answer, User} = require('../models');
const fs = require('fs')
const path = require('path')
const imageUploadPath = path.resolve(__dirname, '..', 'files', 'images');
const {Op} = require('sequelize')
const cut = require("../service/cutService");
const rang = require("../service/roleService")


class QuestionsController {

    async getQues(req, res) {
        try {
            const idQ = req.params.id
            const quset = await Question.findOne({
                where: {
                    id: idQ
                },
            })

            res.send(quset)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User info get error"})
        }
    }

    async add(req, res) {
        try {
            const quest = await Question.create(req.body)
            let len
            {
                req.files != null ? len = req.files.file.length : len = 0
            }
            // Заносим картиночки
            await fs.promises.mkdir(imageUploadPath + '\\' + quest.id, {recursive: true})
            const names = []
            if (len == undefined) {
                const file = req.files.file
                names.push(file.name)
                let filepath = imageUploadPath + '\\' + quest.id + '\\' + file.name
                if (fs.existsSync(filepath)) {
                    return res.status(400).json({message: "Already exist"})
                }
                await file.mv(filepath)
            } else if (len > 0) {
                for (let i = 0; i < req.files.file.length; i++) {
                    const file = req.files.file[i]
                    names.push(file.name)
                    let filepath = imageUploadPath + '\\' + quest.id + '\\' + file.name
                    if (fs.existsSync(filepath)) {
                        return res.status(400).json({message: "Already exist"})
                    }
                    await file.mv(filepath)
                }
            }
            ////////
            quest.files = names
            await quest.save()
            res.send("uploaded successfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }

    async list(req, res) {
        console.log(req.query)
        let titS = req.query.titleSearch;
        let subS = req.query.sub;
        const limit = +req.query.limit;
        const page = +req.query.page;
        if (titS === "" || titS == undefined) {
            if (subS === "Все" || subS == undefined) {
                const questions = await Question.findAll();
                cut(questions, res, page, limit)
            } else {
                const questions = await Question.findAll({
                    where: {
                        subject: subS
                    }
                })
                cut(questions, res, page, limit)
            }
        } else {
            if (subS === "Все" || subS == undefined) {
                const questions = await Question.findAll({
                    where: {
                        [Op.or]: [{
                            title: {
                                [Op.substring]: titS
                            }
                        }, {
                            description: {
                                [Op.substring]: titS
                            }
                        }]
                    }
                })
                cut(questions, res, page, limit)
            } else {
                const questions = await Question.findAll({
                    where: {
                        [Op.and]: [{
                            [Op.or]: [{
                                title: {
                                    [Op.substring]: titS
                                }
                            }, {
                                description: {
                                    [Op.substring]: titS
                                }
                            }]
                        }, {
                            subject: subS
                        }]
                    }
                })
                cut(questions, res, page, limit)
            }
        }
    }

    async addAnswer(req, res) {
        try {
            const answer = await Answer.create(req.body)
            let len
            {
                req.files != null ? len = req.files.file.length : len = 0
            }
            const user = await User.findOne({
                where: {
                    id: answer.userId
                }
            })
            user.score += 1;
            rang(user.id)
            user.save()
            // Заносим картиночки
            await fs.promises.mkdir(imageUploadPath + '\\answers\\' + answer.id, {recursive: true})
            const names = []
            if (len == undefined) {
                const file = req.files.file
                names.push(file.name)
                let filepath = imageUploadPath + '\\answers\\' + answer.id + '\\' + file.name
                if (fs.existsSync(filepath)) {
                    return res.status(400).json({message: "Already exist"})
                }
                await file.mv(filepath)
            } else if (len > 0) {
                for (let i = 0; i < req.files.file.length; i++) {
                    const file = req.files.file[i]
                    names.push(file.name)
                    let filepath = imageUploadPath + '\\answers\\' + answer.id + '\\' + file.name
                    if (fs.existsSync(filepath)) {
                        return res.status(400).json({message: "Already exist"})
                    }
                    await file.mv(filepath)
                }
            }
            answer.files = names
            await answer.save()
            res.send("uploaded successfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Add answer error"})
        }

    }

    async getMy(req, res) {

        const limit = +req.query.limit;
        const page = +req.query.page;
        const userId = req.query.id
        const myQuestions = await Question.findAll({where: {userId}})
        cut(myQuestions,res,page,limit)

    }

    async deleteQues(req, res) {
        try {
            console.log(req.body)
            const ques = await Question.findOne({
                where: {
                    id: req.body.id
                }
            })
            await ques.destroy()
            res.send("Вопрос успешно удален")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Delete question error"})
        }
    }

    async getAnswers(req, res) {
        try {
            const answers = await Answer.findAll({
                where: {
                    questionId: req.body.id
                }
            })
            res.send(answers)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Send answers error"})
        }
    }

    async deleteAnswers(req, res) {
        try {
            const answer = await Answer.findOne({
                where: {
                    id: req.body.id
                }
            })
            var user = await User.findOne({
                where: {
                    id: answer.userId
                }
            })
            user.score -= 1;
            rang(user.id)
            user.save()
            await answer.destroy()
            res.send("Deleted successfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Send answers error"})
        }
    }

    async setBestAnswer(req, res) {
        try {
            const answer = await Answer.findOne({
                where: {
                    id: req.body.id
                }
            })
            answer.isBest = true;
            const user = await User.findOne({
                where: {
                    id: answer.userId
                }
            })
            user.score += 5;
            rang(user.id)
            user.save()

            const question = await Question.findOne({
                where: {
                    id: answer.questionId
                }
            })
            question.isAnswered = true;
            const user2 = await User.findOne({
                where: {
                    id: question.userId
                }
            })
            user2.score += 3;
            rang(user2.id)
            user2.save()
            await answer.save();
            await question.save();
            res.send("Made best answer saccessfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Set best answer error"})
        }
    }


    async getMyAnswers(req,res){
        const limit = +req.query.limit;
        const page = +req.query.page;
        const userId = req.query.id
        try{
            const answers = await Answer.findAll({
                where:{
                    userId
                }
            })
            var setQuestions = new Set();
            answers.forEach(answer => setQuestions.add(answer.questionId))
            var questions = [];
            for (const id of setQuestions) {
                questions.push(await Question.findOne({
                    where: {
                        id: id
                    }
                }));
            }

            cut(questions, res, page, limit)
        }catch (e) {


            console.log(e);
            return res.status(500).json({message: "Get my answers error"})
        }
    }
}

module.exports = new QuestionsController()