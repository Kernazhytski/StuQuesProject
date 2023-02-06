const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host:  process.env.DB_HOST,
    }
)