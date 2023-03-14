const {Role, User} = require('../models');

module.exports = async function (id) {
    const user = await User.findOne({where: {id: id}})
    const roles = await Role.findAll()
    var flag = false
    console.log("----------")
    try {
        roles.some(role => {
            console.log(role.score)
            if (role.score > user.score) {
                console.log("vybrano", role.score)
                user.rang = role.role;
                throw new Exception("Time to end the loop");
            }
        })
    }catch (e){
        flag = true
    }
    if (!flag) {
        console.log("----------")
        user.rang = roles.filter(role => role.id == 10)[0].role
        //console.log(user.rang.)
        console.log("----------")
    }
    console.log("&&&&&")
    user.save()
}