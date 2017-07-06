const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// const db = require('./db');

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/client-chat.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'client-chat', 'chat-script.js'), (err) => {
    next(err);
  });
});

app.get('/client-chat.css', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'client-chat', 'chat-script.css'), (err) => {
    next(err);
  });
});


app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'support', 'index.html'), (err) => {
  next(err);
  });
});


io.on('connection', (socket) => {
  console.log('A user connected');
});


httpServer.listen(8000, () => {
  console.log('Server is running');
});
