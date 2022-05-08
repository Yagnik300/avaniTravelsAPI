const mysql = require('mysql');
const constants = require('../../constants.js');

var connection = mysql.createPool({
  host: constants.DB_HOST,
  user: constants.DB_USER,
  password: constants.DB_PASSWORD,
  database: constants.DB_NAME
});


module.exports = connection;