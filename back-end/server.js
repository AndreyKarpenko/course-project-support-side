const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const db = require('./db');

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}) );
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.send('200');
});

io.on('connection', (socket) => {
  console.log('A user connected');
});

httpServer.listen(8000, () => {
    console.log('Server is running');
});
