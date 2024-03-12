var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");

/**
 * インポートしたルーター
 */
const routers = Object.freeze({
  /** index のルーター */
  index: require('./routes/index'),
  /** login のルーター */
  login: require("./routes/login"),
  /** home のルーター */
  home: require("./routes/home"),
  form: require("./routes/form")
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "ROOTINESESSION",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

//ルーターの設定
app.use('/index', routers.index);
app.use("/login", routers.login);
app.use("/", routers.home)
app.use("/form", routers.form);
// public フォルダを公開
// app.use("/public", express.static("public"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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