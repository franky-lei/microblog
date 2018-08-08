var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var settings = require('./settings');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: settings.cookieSecret,
  store: new MongoStore({
    url: 'mongodb://localhost:27017'
  }),
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/u/:user', usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  next();
});

app.use(function(req, res, next){
  res.locals.error = function(req, res){
    var err = req.flash('error');
    if (err.length)
      return err;
    else
      return null;
  }
  next();
});

app.use(function(req, res, next){
  res.locals.success = function (req, res) {
    var succ = req.flash('success');
    if (succ.length)
      return succ;
    else
      return null;
  },
  next();
});

module.exports = app;
