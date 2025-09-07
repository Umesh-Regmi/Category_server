import nodemailer from 'nodemailer'
import CustomError from '../../middlewares/userHandler_middleware.js'
import { email_config } from '../config/config.js'

// transporter
const transporter = nodemailer.createTransport({
    host: email_config.host,
    port: email_config.port,
    secure: Number(email_config.port) === 465 ? true : false,
    service: email_config.service,
    auth:{
        user: email_config.user,
        pass: email_config.password
    }
})

// Sending email function
export const sendEmail = async({to, subject, html, cc=null, bcc= null, attachments=null}) => {
    try {
        const message_body = {
            to: 'umesh.evolve12@gmail.com',
            subject,
            form: email_config.from,
            html
        }
        if(cc){
            message_body['cc'] = cc
        }
        if(bcc){
            message_body['bcc'] = bcc
        }

        if(attachments){
            message_body['attachments'] = attachments
        }
        return await transporter.sendMail(message_body)
    } catch (error)
     {
        console.log(error)
        throw new CustomError('Email sending error', 500)
    }
}