const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Token } = require('../models')

class TokenService {
    //Функция генерирует два токена и возвращает их
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'});
        return {
            accessToken,
            refreshToken
        }
    }

    //Функция сохраняет refresh токен в базу данных
    async saveToken(userId, refreshToken) {
        const tokenCandidate = await Token.findOne({where: {userId}});
        if(tokenCandidate) {
            //Проверить срок действия токена, если истёк - удалить
            await tokenCandidate.update({refreshToken})
        }
        const token = await Token.create({userId, refreshToken});
        return token
    }
}

module.exports = new TokenService()