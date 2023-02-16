
const { User } = require('../models');

class UserController {
    async getAllUsers(req, res) {
        const allUsers = await User.findAll();
        return res.json(allUsers)
    }
    async getOneuser(req, res) {
        const {id} = req.params;
        const surchUser = await User.findAll({where: {id}});
        return res.json(surchUser)
    }
    async editProfile(req, res) {
        const {id} = req.params;
        return res.json(id)
    }
}

module.exports = new UserController