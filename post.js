const request = require('request');

const json = {
    "name": "Ben",
    "email": "ben@httpchat.dev",
    "username": "benizard"
};

request.post({
    url: 'http://localhost:3001/users',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(error, response, body);
});

/**
 * POST can also be send through as a curl. Example:
 * curl --data "name=Mike&email=mike@httpchat.dev&username=mike" http://localhost:3001/users
 */
