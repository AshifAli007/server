const mysql = require('mysql');
const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user :  'root',
    password: '',
    database: 'wi_new'
});
