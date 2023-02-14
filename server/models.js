const sequalize = require('./db')
const { DataTypes } = require('sequelize');


const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}, 
    role: {type: DataTypes.STRING(20), defaultValue: 'USER'},
    nickname: {type: DataTypes.STRING(20), allowNull: false}, 
    email: {type: DataTypes.STRING(255), allowNull: false, unique: true}, 
    password: {type: DataTypes.STRING(255), allowNull: false}, 
    avatarImg: {type: DataTypes.STRING(255), defaultValue: 'defaultAvatar.png'},
    ban: {type: DataTypes.BOOLEAN, defaultValue: false},
    score: {type: DataTypes.INTEGER, defaultValue: 0},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
},{
    timestamps: false
});

const Question = sequalize.define('question', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}, 
    title: {type: DataTypes.STRING(120), allowNull: false}, 
    description: {type: DataTypes.STRING(3800), allowNull: false}, 
    files: {type: DataTypes.JSON, defaultValue: []},
    subject: {type: DataTypes.STRING(40), allowNull: false}, 
},
{
    timestamps: false
});

const Token = sequalize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Question);
Question.belongsTo(User);
User.hasOne(Token);
Token.belongsTo(User);

module.exports = {
    User, 
    Question,
    Token
}