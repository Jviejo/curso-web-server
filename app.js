var express = require('express');

var app = express();

app.get("/", function (request, response) {
    response.send("Hi there, welcome to my assignment!");
})

app.get("/ping", (request, response) => {
    response.send(new Date().toISOString());
}
)

app.listen(5555, function () {
    console.log('listening on port 4444');
})