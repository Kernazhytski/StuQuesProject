const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const uuid = require('uuid');
require('dotenv').config();

const {User} = require('../models');
const MailService = require('./mailService');
const questionService = require('./questionService');
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
                message: `Пользователь с почтовым адресом ${email} уже зарегистрирован`,
                problem: 'email'
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
        const userQuestions = await questionService.getUserQuestions(newUser.id);
        const userAnswers = await questionService.getUserAnswers(newUser.id);

        return {
            success: true,
            ...tokens,
            userData: {id: newUser.id,
                        avatarImg: newUser.avatarImg, 
                        ban: newUser.ban, 
                        email: newUser.email, 
                        nickname: newUser.nickname, 
                        role: newUser.role, 
                        score: newUser.score, 
                        aboutMe: newUser.aboutMe,
                        userQuestions,
                        userAnswers
                    }
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
                message: `Пользователь с почтовым адресом ${email} не найден`,
                problem: 'email'
            }
        }
        if(!user.isActivated) {
            return {
                success: false,
                message: `Пользователь не активирован`,
            }
        }
        const compare = bcrypt.compareSync(password, user.password);
        if(!compare) {
            return {
                success: false,
                message: `Неверный пароль`,
                problem: 'password'
            }
        }
        const tokens = TokenService.generateToken({userId :user.id, email, isActivated: user.isActivated});
        //Отправляем refresh токен в базу данных
        await TokenService.saveToken(user.id, tokens.refreshToken);
        const userQuestions = await questionService.getUserQuestions(user.id);
        const userAnswers = await questionService.getUserAnswers(user.id);
        return {
            success: true,
            ...tokens,
            userData: {id: user.id,
                        avatarImg: user.avatarImg, 
                        ban: user.ban,
                        email: user.email, 
                        nickname: user.nickname, 
                        role: user.role, 
                        score: user.score,
                        aboutMe: user.aboutMe,
                        userAnswers,
                        userQuestions
                    }
        } 
    }
    async logout(refreshToken) {
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
        const tokenFromDd = await tokenService.findToken(refreshToken);
        //console.log(refreshToken)
        //console.log(tokenFromDd)
        if(!userData || !tokenFromDd) {
            return {
                success: false,
                message: `Ошибка при проверке токена.`
            }   
        }
        const user = await User.findOne({where: {id: userData.userId}})
        const tokens = TokenService.generateToken({userId :user.id, email: user.email, isActivated: user.isActivated});
        //Отправляем refresh токен в базу данных
        //await TokenService.saveToken(user.id, tokens.refreshToken);
        return {
            success: true,
            ...tokens,
            user
        } 
    }
}

module.exports = new UserService()