const userService = require('../service/userService');

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password, nickName} = req.body;
            const userData = await userService.registretion(email, password, nickName);
            //httpOnly не позволяет получать/изменять куки из фронтенда (для http)
            //secure для hhtps
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true})
            return res.json(userData);
        } catch(e) {
            console.log(e)
        }
    }
    async login(req, res, next) {
        try {

        } catch(e) {
            
        }
    }
    async logout(req, res, next) {
        try {

        } catch(e) {
            
        }
    }
    async activate(req, res, next) {
        try {

        } catch(e) {
            
        }
    }
    async refresh(req, res, next) {
        try {

        } catch(e) {
            
        }
    }
}

module.exports = new AuthController