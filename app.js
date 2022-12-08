require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const calcRouter = require('./routes/calculation');
const cargoRouter = require('./routes/cargo');
const trackRouter = require('./routes/trackNumber');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('==========> MongoDB connected'))
    .catch(err => console.log('==========> err = ' , err));

app.use(passport.initialize());
require('./middleware/passport')(passport)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/calculation', calcRouter);
app.use('/api/cargo', cargoRouter);
app.use('/api/track', trackRouter);

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
