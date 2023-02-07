const nodemailer = require('nodemailer');
require('dotenv').config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(email, code) {
        console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD)
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Активация аккаута StuQues`,
            text: '',
            html: `
                <div>
                    <h1>Код для активации: </h1>
                    <p>${code}</p>
                </div>
            `
        })
    }
}

module.exports = new MailService()