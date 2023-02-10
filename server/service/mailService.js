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
    async sendActivationMail(email, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Активация аккаута StuQues`,
            text: '',
            html: `
                <div>
                    <h1>Перейдите по ссылке для активации </h1>
                    <div>
                        <a href="${link}">${link}</a>
                    </div>
                </div>
            `
        })
    }
}

module.exports = new MailService()