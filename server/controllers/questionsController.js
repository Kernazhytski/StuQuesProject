const {Question} = require('../models');
const fs = require('fs')
const path = require('path')
const imageUploadPath = path.resolve(__dirname, '..', 'files', 'images');

class QuestionsController {

    async getQues(req, res) {
        try {
            const idQ = req.params.id
            const quset = await Question.findOne(
                {
                    where: {
                        id: idQ
                    },
                }
            )

            res.send(quset)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User info get error"})
        }
    }

    async add(req, res) {
        try {
            const quest = await Question.create(req.body)
            let len = req.files.file.length
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
            } else {
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
        res.send(await Question.findAll()).json
    }
}

module.exports = new QuestionsController()