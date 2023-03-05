const sequalize = require('./db')
const {DataTypes} = require('sequelize');


const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    aboutMe: {type: DataTypes.STRING(3800), defaultValue: ''},
    role: {type: DataTypes.STRING(20), defaultValue: 'USER'},
    nickname: {type: DataTypes.STRING(20), allowNull: false},
    email: {type: DataTypes.STRING(255), allowNull: false, unique: true},
    password: {type: DataTypes.STRING(255), allowNull: false},
    avatarImg: {type: DataTypes.STRING(255), defaultValue: 'defaultAvatar.png'},
    ban: {type: DataTypes.BOOLEAN, defaultValue: false},
    score: {type: DataTypes.INTEGER, defaultValue: 0},
    rang: {type: DataTypes.STRING(20), allowNull: false,defaultValue: "Новичек"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
}, {
    timestamps: false
});

const Question = sequalize.define('question', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            title: {type: DataTypes.STRING(120), allowNull: false},
            description: {type: DataTypes.STRING(3800), allowNull: false},
            files: {type: DataTypes.JSON, defaultValue: []},
            subject: {type: DataTypes.STRING(40), allowNull: false},
            isAnswered: {type: DataTypes.BOOLEAN, defaultValue: false}
        },
        {
            timestamps: false
        }
    )
;

const Token = sequalize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false}
})

const Answer = sequalize.define('answer', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        text: {type: DataTypes.STRING(3800), allowNull: false},
        files: {type: DataTypes.JSON, defaultValue: []},
        isBest: {type: DataTypes.BOOLEAN, defaultValue: false}
    },
    {
        timestamps: true
    });

const Role = sequalize.define('role',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    role: {type: DataTypes.STRING(20), allowNull: false},
    score: {type: DataTypes.INTEGER}
},{
    timestamps: false
})

User.hasMany(Question);
Question.belongsTo(User);
User.hasOne(Token);
Token.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);
Question.hasMany(Answer);
Answer.belongsTo(Question);

module.exports = {
    User,
    Question,
    Token,
    Answer,
    Role
}