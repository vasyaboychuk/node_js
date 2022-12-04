const {WELCOME, SECOND_BLOCK} = require("../config/email-actions.enum");
module.exports = {
    [WELCOME]: {
        subject: 'Welcome on board',
        templateName:'welcome'
    },
    [SECOND_BLOCK]: {
        subject: 'Welcome on board',
        templateName:'secondBlock'
    }
}