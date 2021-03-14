/* SimpleAuth */
const path = require('path');
const createError = require('http-errors');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const connectDB = require('./models/db/');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

connectDB();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: 'authenticating',
    saveUninitialized: true,
    resave: true,
  })
);

require('./auth/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.messages = req.flash('messages');
  res.locals.title = req.session.title;
  res.locals.error = req.flash('error');
  res.locals.authorized = req.isAuthenticated();
  res.locals.valErrors = req.session.errors;
  delete req.session.messages;
  delete req.session.title;
  delete req.session.errors;

  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
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
