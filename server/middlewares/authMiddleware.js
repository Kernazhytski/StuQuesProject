const { User } = require('../models');
const tokenService = require('../service/tokenService')

module.exports = async function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).json('Нужно авторизоваться 1')
        }
        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.status(401).json('Нужно авторизоваться 2')
        }
        //console.log(authHeader)
        const userData = tokenService.validateAccessToken(token);
        if(!userData) {
            return res.status(401).json('Нужно авторизоваться 3')
        }
        const user = await User.findOne({where: {id: userData.userId}});
        if(user.ban) {
            return res.status(666).json('Пользователь забанен')
        }
        req.user = userData;
        next();
    } catch (error) {
        return res.status(401).json('Нужно авторизоваться 4') 
    }
}