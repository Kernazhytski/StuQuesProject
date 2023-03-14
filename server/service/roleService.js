const {Role, User} = require('../models');

module.exports = async function (id) {
    const user = await User.findOne({where: {id: id}})
    if (user.role !== "ADMIN") {
        const roles = await Role.findAll()
        var flag = false
        try {
            roles.some(role => {
                if (role.score > user.score) {
                    user.rang = role.role;
                    throw new Exception("Time to end the loop");
                }
            })
        } catch (e) {
            flag = true
        }
        if (!flag) {
            user.rang = roles.filter(role => role.id == 10)[0].role
        }
    }else{
        user.rang = "Админ";
    }
    user.save()
}