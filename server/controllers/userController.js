const path = require('path');
const fs = require('fs');
const { User } = require('../models');

class UserController {
    async getAllUsers(req, res) {
        const allUsers = await User.findAll();
        return res.json(allUsers)
    }
    async getOneuser(req, res) {
        const {id} = req.params;
        const surchUser = await User.findOne({where: {id}});
        return res.json(surchUser)
    }
    async editProfile(req, res) {
        const {id} = req.params;
        let img;
        let candidate;
        const {nickname, aboutMe} = req.body
        if(req.files == null) {
            candidate = await User.update({nickname, aboutMe}, {where: {id}});
        }
        else {
            img = req.files.file;
            const user = await User.findOne({where: {id}});
            const oldImg = user.avatarImg;
            fs.unlink(path.resolve(__dirname, '..', 'static', 'usersAvatars', oldImg), err => console.log(err))
            const extension = img.mimetype.split('/').reverse()[0]
            const fileName = `${img.md5}.${extension}`;
            img.mv(path.resolve(__dirname, '..', 'static', 'usersAvatars', fileName));
            candidate = await User.update({nickname, aboutMe, avatarImg: fileName}, {where: {id}});
        }
        if(!candidate) {
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
}

module.exports = new UserController