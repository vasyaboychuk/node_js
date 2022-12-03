const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/config');
const EmailTemplates = require('email-templates');
const path = require('path');
const emailTemplates = require('../email-templates/info');
const ApiError = require("../error/ApiError");

const sendEmail =  async (receiverEmail,emailAction,locals={}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD,
        }
    });

     const templateInfo=emailTemplates[emailAction];

    if (!templateInfo) {
        throw new ApiError('wrong template',500)
    }

    const templateRenderer = new EmailTemplates({
        views:{
            root: path.join(process.cwd(), 'email-templates')
        }
    });
    const html = await templateRenderer.render(templateInfo.templateName,locals);

    return transporter.sendMail({
        from: 'No reply',
        to: receiverEmail,
        subject: templateInfo.subject,
        html
    })
}
module.exports = {
    sendEmail
}