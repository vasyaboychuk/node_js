const twilio = require("twilio");

const {TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN} = require('../config/config')


const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = async (message,phoneNumber) => {
    try {
        console.log(`sms start sending ~ number ${phoneNumber}`)

        const smsResp = await client.messages.create({
            body: message,
            to: phoneNumber,
            messagingServiceSid: TWILIO_SERVICE_SID
        })
        console.log(`sms resp~${smsResp.status}`)
    } catch (e) {
        console.error(`SMS service :${e.message}`)
    }

}

module.exports = {
    sendSms
}