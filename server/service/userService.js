const bcrypt = require('bcrypt');
const uuid = require('uuid');

const {User} = require('../models');
const MailService = require('./mailService');
const TokenService = require('./tokenService');

class UserService {
    //Функция, отвечающая за регистрацию новых пользователей
    async registretion(email, password, nickName) {
        //Ищем в бд пользователя с таким же email
        const candidate = await User.findOne({where: {email}});
        //Если нашли, то кидаем ошибку
        if(candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        //Если нет, то хешируем пароль, создаём ссылку-активатор, которую отправим на почту для активации аккаунта
        const hashPassword = bcrypt.hashSync(password, Math.ceil(password.length / 2));
        const activationCode = uuid.v4();
        //Создаём пользователя в базе данных
        const newUser = await User.create({email, nickName, password: hashPassword, activationCode});
        //Отправляем ссылку на почту
        await MailService.sendActivationMail(email, activationCode);
        //Генерируем два токена(access, refresh)
        const tokens = TokenService.generateToken({userId :newUser.id, email, isActivated: newUser.isActivated});
        //Отправляем refresh токен в базу данных
        await TokenService.saveToken(newUser.id, tokens.refreshToken);

        return {
            ...tokens,
            newUser
        }
    }
}

module.exports = new UserService()