require('dotenv').config();
const tokenService = require('../service/tokenService');
//const {validationResult} = require('express-validator');

const userService = require('../service/userService');

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password, nickname} = req.body;
            const userData = await userService.registretion(email, password, nickname);
            //httpOnly не позволяет получать/изменять куки из фронтенда (для http)
            //secure для hhtps
            if(userData.success === false) {
                return res.json({success: false, message: userData.message, problem: userData.problem})
            }
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true})
            return res.json({success: true, message: 'Регистрация прошла успешно.', userData});
        } catch(e) {
            console.log(e)
            res.json({success: false, message: 'Ошибка при регистрации.', error: e});
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            if(!userData.success) {
                return res.json(userData)
            }

            //httpOnly не позволяет получать/изменять куки из фронтенда (для http)
            //secure для hhtps
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true})
            return res.json({success: true, message: 'Авторизация прошла успешно.', userData});
        } catch(e) {
            console.log(e)
            res.json({success: false, message: 'Ошибка при авторизации.', error: e});
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie(refreshToken);
            return res.json(token)
        } catch(e) {
            res.json({success: false, message: 'Ошибка при выходе из аккаунта.', error: e});
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            res.json({success: false, message: 'Ошибка при активации ссылки.', error: e})
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            //console.log(refreshToken)
            const userData = await userService.refresh(refreshToken);
            //res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true})
            console.log(userData)
            return res.json(userData);
        } catch(e) {
            console.log(e)
            res.json({success: false, message: 'Ошибка при обновлении токена.', error: e})
        }
    }
}

module.exports = new AuthController