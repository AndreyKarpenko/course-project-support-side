var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var io = require('socket.io').listen(8000);
// Если я правильно понял, то оскет будет слушать порт, который указан в его методе. Но пока у нас не готова вся логика чата, то я слушаю порт в 18 строке
var io = require('socket.io');
// var db = require('db');


var app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );

app.get('/', function (req, res, next) {
    res.send('200');
})

app.listen(8000, function () {
    console.log('server is runned');
})
