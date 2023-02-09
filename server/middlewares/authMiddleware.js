const tokenService = require('../service/tokenService')

module.exports = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.json('Нужно авторизоваться 1')
        }
        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.json('Нужно авторизоваться 2')
        }
        const userData = tokenService.validateAccessToken(token);
        if(!userData) {
            return res.json('Нужно авторизоваться 3')
        }
        req.user = userData;
        next();
    } catch (error) {
        return res.json('Нужно авторизоваться 4') 
    }
}