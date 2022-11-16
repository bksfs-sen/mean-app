var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const dotenv = require("dotenv");
// dotenv.config();

var DB = require('./core/db');
// console.log("DB======", DB);

const { spawn, exec } = require('child_process');

const dbCoonection = DB.mongoDbConnect();
dbCoonection.then(
  (dbRes) => {
    // const child = exec('pwd');
    console.log("child========", child);

  setImmediate(function A() {
      console.log("1st immediate");
  });
    
  setImmediate(function B() {
      console.log("2nd immediate");
  });
    
  process.nextTick(function C() {
      console.log("1st process");
  });
    
  process.nextTick(function D() {
      console.log("2nd process");
  });
    
  // First event queue ends here
  console.log("program started");

    // console.log('db connected');
  },
  (dbErr) => {
    console.log('db connection error', dbErr)
  }
)

var app = express();
app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: false
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;