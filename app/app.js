var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

// mongodb setup
var mongoose = require("mongoose"),
    dbURI = 'mongodb://localhost/ping',
    db = mongoose.connection;
// mongoose.createConnection("mongodb://localhost/ping");

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
// console.log('connection.readyState =', mongoose.connection.readyState);

db.on('connecting', function() {
    console.log('connecting to MongoDB...');
    console.log('connection.readyState =', mongoose.connection.readyState);
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
    console.log('connection.readyState =', mongoose.connection.readyState);
});
db.on('connected', function() {
    console.log('MongoDB connected!');
    console.log('connection.readyState =', mongoose.connection.readyState);
});
db.once('open', function() {
    console.log('MongoDB connection opened!');
    console.log('connection.readyState =', mongoose.connection.readyState);
});
db.on('reconnected', function() {
    console.log('MongoDB reconnected!');
    console.log('connection.readyState =', mongoose.connection.readyState);
});
db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    console.log('connection.readyState =', mongoose.connection.readyState);
});
mongoose.connect(dbURI, { server: { auto_reconnect: true } });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true
}));

// // override with POST having ?_method=DELETE
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    } else {}
}));


app.use(express.static(path.join(__dirname, 'public')));

// 如果要用全域的middleware要放在router setting前面
app.use(function(req, res, next) {
    console.log("db.readyState", db.readyState);
    next();
});

app.use(require('./routes'));

// 如果routes沒有處理到的話，送出err
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("in error");
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(3001, function() {
    console.log("Express server is running on port 3001:" + app.get('env'));
});
