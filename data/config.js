const mysql = require('mysql');

function Database() {
    let db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'node'
    });

    db.connect(error => {
        if (error) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Database connected');
    });

    this.select = (query, callback) => {
        db.query(query, (error, rows) => {
            if (error) {
                console.log(error);
            }
            callback(rows);
        });
    }

    this.insert = (query, insert, callback) => {
        db.query(query, insert, (error, result) => {
            if (error) {
                console.log(error);
            }
            callback(result);
        });
    }
}

module.exports = Database;