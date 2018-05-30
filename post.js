var request = require('request');

var json = {
    "name": "Ben",
    "email": "ben@httpchat.dev",
    "username": "benizard"
};

request.post({
    url: 'http://localhost:3001/users',
    body: json,
    json: true
}, function (error, response, body) {
    console.log(body);
    console.log(error);
    console.log(response);
});


//curl --data "id=5&name=Mike&email=mike@httpchat.dev&username=mike" http://localhost:3001/users