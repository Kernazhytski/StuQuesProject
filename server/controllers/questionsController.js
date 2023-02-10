const { Question } = require('../models');
const fs = require("fs");
const path = require('path')
const imageUploadPath = path.resolve(__dirname, '..', 'files', 'images');

class QuestionsController {

    async add(req, res) {
        try {
            const quest = await Question.create({
                title: req.body.title,
                description: req.body.description,
                subject: req.body.subject
            })

            let len = req.files.file.length
            console.log(quest.id)
            // Заносим картиночки
            await fs.promises.mkdir(imageUploadPath + '\\'+ quest.id, { recursive: true })
            if (len == undefined) {
                const file = req.files.file
                let filepath = imageUploadPath + '\\'+ quest.id + '\\' + file.name
                if (fs.existsSync(filepath)) {
                    return res.status(400).json({message: "Already exist"})
                }
                await file.mv(filepath)
            } else {
                for (let i = 0; i < req.files.file.length; i++) {
                    const file = req.files.file[i]
                    let filepath = imageUploadPath + '\\' + quest.id + '\\' + file.name
                    if (fs.existsSync(filepath)) {
                        return res.status(400).json({message: "Already exist"})
                    }
                    await file.mv(filepath)
                }
            }

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