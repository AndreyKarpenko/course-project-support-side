var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req,res,next) {
    res.send('200')
})

app.listen(8000, function () {
    console.log('server is runned')
})
