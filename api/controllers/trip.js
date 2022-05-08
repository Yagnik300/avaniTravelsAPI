const constants = require('../../constants.js');
const Trip = require('../models/trip.js');
const sendSms = require('../service/twilio.js');
const tripController = {};

tripController.book_trip = (req, res, next) => {
    const { start_destination, end_destination, trip_type, date1, time1, date2, time2, car_type, message, full_name, phone_number, email } = req.body;

    if(start_destination && end_destination && trip_type && date1 && time1 && car_type && full_name && phone_number && email ){
                
        var trip = {
            start_destination: start_destination,
            end_destination: end_destination,
            trip_type: trip_type,
            date1: date1,
            time1: time1,
            car_type: car_type,
            message: message,
            full_name: full_name,
            phone_number: phone_number,
            email: email,
            created_at: new Date(new Date().toUTCString())
        };
        if (trip_type == 'round_trip'){
            if((date2 !== null && date2 !== '') && (time2 !== null && time2 !== '')){
                trip.date2 = date2;
                trip.time2 = time2;
            }else{
                return res.status(200).json({
                    res_code: 0,
                    res_message: 'Invalid Post Parameter'
                }).send();
            }
        }

        Trip.create(trip, (err, insertID) => {
            if (err) {
                return res.status(200).json({
                    res_code: 0,
                    res_message: 'Internal Server Error.'
                }).send();
            }

            if(insertID > 0){

                if(constants.SMS_ENABLE){
                    //send sms
                    const commonMessage = 'From: '+start_destination+'\nTo: '+end_destination+'\nDate: '+date1+'&Time: '+time1+'\nName: '+full_name+'\nFor more details contact ';
                    const userMessage = commonMessage+constants.ADMIN_PHONE_NUMBER;
                    const adminMessage = commonMessage+phone_number;
                    sendSms(phone_number, userMessage);
                    sendSms(constants.ADMIN_PHONE_NUMBER, adminMessage);
                }

                return res.status(200).json({
                    res_code: 1,
                    res_message: 'Trip Booked successfully',
                }).send();
            }
            
        });
    }else {
        return res.status(200).json({
            res_code: 0,
            res_message: 'Invalid Post Parameter'
        }).send();
    }
}

module.exports = tripController;