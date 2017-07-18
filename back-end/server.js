const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const db = require('./db');
require('./task-scheduler')();

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

require('./api')(app);

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'support', 'index.html'), (err) => {
    next(err);
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('error', (err) => {
    console.error(err);
  });
});

httpServer.listen(8000, () => {
  console.log('Server: server is running');
});

httpServer.on('error', (err) => {
  console.error(err);
});
