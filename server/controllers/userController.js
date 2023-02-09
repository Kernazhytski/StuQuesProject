const { User } = require('../models');

class UserController {
    async getAllUsers(req, res) {
        const allUsers = await User.findAll();
        return allUsers
    }
    async getOneuser(req, res) {
        const {id} = req.params;
        const surchUser = await User.findAll({where: {id}});
        return surchUser
    }
}

module.exports = new UserController