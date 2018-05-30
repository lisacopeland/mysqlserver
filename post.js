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


//curl --data "id=4&name=Joao&email=joao@httpchat.dev&username=jpggvilaca" http://localhost:3001/users