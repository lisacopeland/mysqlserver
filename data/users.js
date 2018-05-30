const Database = require('./config');
const connection = new Database();

let users = [];

connection.select('SELECT * FROM users', rows => {
    rows.forEach(user => {
        users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username
        });
    });
});

module.exports = users;