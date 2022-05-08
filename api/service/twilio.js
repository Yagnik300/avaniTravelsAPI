require('dotenv').config();
const constants = require('../../constants.js');
const accountSid = constants.TWILIO_ACCOUNT_SID;
const authToken = constants.TWILIO_AUTH_TOKEN;

const sendSms = (phone, message) => {
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: constants.TWILIO_PHONE_NUMBER,
       to: phone
     })
    .then(message => console.log(message.sid));
}

module.exports = sendSms;