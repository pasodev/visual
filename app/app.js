var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var index = require('./routes/index');
var users = require('./routes/users');

// Mine
var upload = require('./routes/upload');
var list =   require('./routes/list');
var show = require('./routes/show');
var getremote = require('./routes/getremote');

var app = express();

// My global vars

var routeToFiles = __dirname + '/../uploads/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use('/', index);
app.use('/users', users);

// Mine
app.use('/upload', upload);
app.use('/list', list);
app.use('/show', show);
app.use('/getremote', getremote);
app.use('/board',express.static(__dirname + '/node_modules/tnt.board/build/'));

app.listen(3000, function(){
    console.log('Server started...');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
