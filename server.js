//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var autoLoad = require('auto-load');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs-extra');

require("./src/client-import");
autoLoad(path.join(__dirname, 'src/global'));

var config = require('./config');

var app = express();

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

fs.ensureDir(config.storage_path, function(err) {
  err && console.error(err);
});
fs.ensureDir(config.upload_path, function(err) {
  err && console.error(err);
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

app.use(favicon(path.join(__dirname, 'app/public/img/Logo', 'Logo - 256.png')));
app.use(logger('dev' /*config.env*/ ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.enable('trust proxy');

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// set Content-Security-Policy header
app.use((req, res, next) => {
  res.header('Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' www.google.com www.gstatic.com;" +
    "img-src 'self' data:;" +
    "font-src 'self' data:;" +
    "connect-src 'self'" + (config.env === 'dev' ? " http://dev.javabazmayesh.ir:50305 ws://dev.javabazmayesh.ir:50305" : "") + ";");
  next();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// serving routes
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use('/master', require('./routes/master'));
app.use('/answer', require('./routes/answer'));
app.use('/history', require('./routes/history'));
app.use('/post', require('./routes/post'));
app.use('/balance', require('./routes/balance'));

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// static folders
app.use(express.static(path.join(__dirname, 'app/public')));

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// error handlers

// development error handler
// will print stacktrace
if (config.env === 'dev' || config.env === 'test') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    res.send(JSON.stringify(err, null, 4)).end();
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
  res.send(err.message).end();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

module.exports = app;

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
