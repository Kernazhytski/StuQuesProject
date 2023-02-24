const path = require('path');
const fs = require('fs');
const {User} = require('../models');
const questionService = require('../service/questionService');

class UserController {
    async getAllUsers(req, res) {
        const allUsers = await User.findAll({
            where: {isActivated: true},
            attributes: ['id', 'aboutMe', 'role', 'nickname', 'avatarImg', 'score']
        });
        return res.json(allUsers)
    }

    async getOneUser(req, res) {
        const {id} = req.params;
        const userQuestions = await questionService.getUserQuestions(id);
        const userAnswers = await questionService.getUserAnswers(id);

        //console.log(userQuestions, userAnswers)
        const searchUser = await User.findOne({
            where: {id},
            attributes: ['id', 'aboutMe', 'role', 'nickname', 'avatarImg', 'score', 'ban']
        });
        searchUser.dataValues.userQuestions = userQuestions;
        searchUser.dataValues.userAnswers = userAnswers;
        return res.json(searchUser)
    }

    async editProfile(req, res) {
        const {id} = req.params;
        let img;
        let candidate;
        const {nickname, aboutMe} = req.body
        if (req.files == null) {
            candidate = await User.update({nickname, aboutMe}, {where: {id}});
        } else {
            img = req.files.file;
            const user = await User.findOne({where: {id}});
            const oldImg = user.avatarImg;
            if (oldImg != "defaultAvatar.png") {
                fs.unlink(path.resolve(__dirname, '..', 'static', 'usersAvatars', oldImg), err => console.log(err))
            }
            const extension = img.mimetype.split('/').reverse()[0]
            const fileName = `${img.md5}.${extension}`;
            img.mv(path.resolve(__dirname, '..', 'static', 'usersAvatars', fileName));
            candidate = await User.update({nickname, aboutMe, avatarImg: fileName}, {where: {id}});
        }
        if (!candidate) {
            return res.json({
                success: false,
                message: 'Указанный пользователь не найден'
            })
        }
        return res.json({
            success: true,
            message: 'Пользователь успешно изменён'
        })
    }
    async banUser(req, res) {
        const {id} = req.params;
        const user = await User.findOne({where: {id}});
        if(!user) {
            return res.json({
                success: false,
                message: 'Пользователь не найден'
            })
        }
        await user.update({ban: true});

        return res.json({
            success: true,
            message: 'Пользователь забанен'
        })
    }
    async unbannUser(req, res) {
        const {id} = req.params;
        const user = await User.findOne({where: {id}});
        if(!user) {
            return res.json({
                success: false,
                message: 'Пользователь не найден'
            })
        }
        await user.update({ban: false});

        return res.json({
            success: true,
            message: 'Пользователь разбанен'
        })
    }
}

module.exports = new UserController