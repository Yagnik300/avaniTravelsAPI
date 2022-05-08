const sql = require('./db.js');

const Trip = function(book) {
    this.start_destination = book.start_destination;
    this.end_destination = book.end_destination;
    this.trip_type = book.trip_type;
    this.date1 = book.date1;
    this.time1 = book.time1;
    this.date2 = book.date2;
    this.time2 = book.time2;
    this.car_type = book.car_type;
    this.message = book.message;
    this.full_name = book.full_name;
    this.phone_number = book.phone_number;
    this.email = book.email;
    this.created_at = book.created_at;
};

Trip.create = (trip, result) => {
    sql.query("INSERT INTO tbl_trip SET ?", trip, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if(res.insertId){
        result(null, res.insertId);
      }else{
        result(null, false);
      }
    });
};

module.exports = Trip;