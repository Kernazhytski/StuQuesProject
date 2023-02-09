const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const uuid = require('uuid');
require('dotenv').config();

const {User} = require('../models');
const MailService = require('./mailService');
const tokenService = require('./tokenService');
const TokenService = require('./tokenService');

class UserService {
    //Функция, отвечающая за регистрацию новых пользователей
    async registretion(email, password, nickname) {
        //Ищем в бд пользователя с таким же email
        const candidate = await User.findOne({where: {email}});
        //Если нашли, то кидаем ошибку
        if(candidate) {
            return {
                success: false,
                message: `Пользователь с почтовым адресом ${email} уже зарегистрирован.`
            }
        }
        //Если нет, то хешируем пароль, создаём ссылку-активатор, которую отправим на почту для активации аккаунта
        const hashPassword = bcrypt.hashSync(password, Math.ceil(password.length / 2));
        const activationLink = uuid.v4();
        //Создаём пользователя в базе данных
        const newUser = await User.create({email, nickname, password: hashPassword, activationLink});
        //Отправляем ссылку на почту
        await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/auth/activate/${activationLink}`);
        //Генерируем два токена(access, refresh)
        const tokens = TokenService.generateToken({userId :newUser.id, email, isActivated: newUser.isActivated});
        //Отправляем refresh токен в базу данных
        await TokenService.saveToken(newUser.id, tokens.refreshToken);

        return {
            success: true,
            ...tokens,
            message: newUser
        }
    }
    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}});
        if(!user) {
            return {
                success: false,
                message: `Неккоректная ссылка активации.`
            }
        }
        User.update({isActivated: true}, {where: {activationLink}});
        return {
            success: true,
            message: user
        } 
    }
    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if(!user) {
            return {
                success: false,
                message: `Пользователь с почтовым адресом ${email} не найден.`
            }
        }
        const tokens = TokenService.generateToken({userId :user.id, email, isActivated: user.isActivated});
        //Отправляем refresh токен в базу данных
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return {
            success: true,
            ...tokens,
            message: user
        } 
    }
    async logout(refreshToken) {
        //console.log(refreshToken)
        const token = TokenService.removeToken(refreshToken);
        return token
    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            return {
                success: false,
                message: `Ошибка при получении токена.`
            } 
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDd = tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDd) {
            return {
                success: false,
                message: `Ошибка при проверке токена.`
            }   
        }

        const user = User.findOne({where: {id: userData.id}})
        const tokens = TokenService.generateToken({userId :user.id, email, isActivated: user.isActivated});
        //Отправляем refresh токен в базу данных
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return {
            success: true,
            ...tokens,
            message: user
        } 
    }
}

module.exports = new UserService()