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
app.use( bodyParser.urlencoded({extended: true}) );
app.use(cookieParser());




app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'public','temp','test.html'),(err) => {
        next(err);
    });
});




/*
app.get('/', (req, res, next) => {
  res.send('200');
});
*/

app.use((req, res, next) => {
    if (req.url == '/'){

    }else{
        next();
    }
});

app.use((req, res, next) => {
    if (req.url != '/'){
        res.end("Hello2");
    }else{
        next();
    }
});





io.on('connection', (socket) => {
  console.log('A user connected');
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


httpServer.listen(8000, () => {
    console.log('Server is running');
});
