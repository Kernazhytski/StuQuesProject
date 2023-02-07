const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const sequelize = require('./db');
const models = require('./models');
const userRouter = require('./routes/authRoutes')
const questionRouter = require('./routes/questionRoutes')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'static', 'usersAvatars')));

app.use('/auth', userRouter);
app.use('/question',questionRouter)

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();//{ force: true }{ alter: true }
        console.log('Соединение с базой данных прошло успешно.');
        app.listen(PORT, () => {
            console.log(`Сервер запущен. Порт ${PORT}`)
        })            
    }
    catch(error) {
        console.log(error)
    }
}
start()

