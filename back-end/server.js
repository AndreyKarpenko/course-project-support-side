var express = require('express');

var app = express();

app.get('/', function (req,res,next) {
    res.send('200')
})

app.listen(8000, function () {
    console.log('server is runned')
})
