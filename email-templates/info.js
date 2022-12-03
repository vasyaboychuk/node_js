const {WELCOME, FORGOT_PASS} = require("../config/email.actions.enum");
module.exports={
    [WELCOME]: {
        subject: 'Welcome on board',
        templateName:'welcome'
    },
    [FORGOT_PASS]:{
        subject: 'oops , your password is under protected',
        templateName:'forgot-pass'
    }
}