const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node'
}

const connect = config => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);

        connection.connect(error => {
            if (error) {
                reject(error);
            } else {
                resolve(connection);
            }
        });
    });
}

const select = query =>
    new Promise((resolve, reject) =>
        connect(config)
        .then(connection => connection.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }))
    );

const insert = (query, values) =>
    new Promise((resolve, reject) =>
        connect(config)
        .then(connection => connection.query(query, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }))
    );

module.exports = {
    select,
    insert
}