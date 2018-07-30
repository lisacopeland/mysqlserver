const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api',
};

const connection = mysql.createPool(config);

module.exports = connection;