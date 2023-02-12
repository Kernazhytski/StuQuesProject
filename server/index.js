const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const sequelize = require('./db');
const models = require('./models');

const questionRouter = require('./routes/questionRoutes')
const authRouter = require('./routes/authRoutes')
const userRoter = require('./routes/userRouter')
const fileUpload = require("express-fileupload");


require('dotenv').config()

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 2000;

app.use(fileUpload({}))
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());


app.use(express.static(path.resolve(__dirname, 'static', 'usersAvatars')));



app.use('/question',questionRouter)

app.use('/auth', authRouter);
app.use('/users', userRoter);


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

