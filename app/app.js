var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Above is to require the express and other related node modules.

var index_router = require('./routes/index_router');
var users_router = require('./routes/users_router');
var login_router = require('./routes/login_router');
var logout_router = require('./routes/logout_router');
var dashboard_router = require('./routes/dashboard_router');


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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/login',login_router);
app.use('/logout',logout_router);
app.use('/dashboard',dashboard_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
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

app.listen(3000,function(){
  console.log(app.get('env'));
  console.log("Express server is running on port 3000");
});
// module.exports = app;
