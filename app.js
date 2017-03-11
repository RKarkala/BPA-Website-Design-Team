var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');



var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var home = require('./routes/home');
var stores = require('./routes/stores');
var contact = require('./routes/contact');
var forum = require('./routes/forum');
var logout = require('./routes/logout');
var projects = require('./routes/projects');
var about = require('./routes/about');

var app = express();


// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/', home);
app.use('/users', users);
app.use('/signup', signup);
app.use('/stores', stores);
app.use('/contact', contact);
app.use('/login', login);
app.use('/forum', forum);
app.use('/logout', logout);
app.use('/projects', projects);
app.use('/about', about);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//lets require/import the mongodb native drivers.









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
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
