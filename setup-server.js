var express = require('express');
var app = express();
var logger = require('morgan');
var dotenv = require('dotenv').config();
var routes = require('./routes/routes');
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const favicon = require('serve-favicon');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const promisify = require('es6-promisify');
const csrf = require('csurf');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user.model');
var hbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const noCache = require('nocache');

// Express Handlebars

app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: "views/layouts/",
    partialsDir: __dirname + '/views/partials',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

// MongoDB

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI)
.then(() =>  console.log('MongoDB Connection Succesful'))
.catch((err) => console.error(err));

// Session Config

app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

// Passport

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// Logging

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// Cors

var corsOptions = {
    origin: [process.env.WHITELISTED_CORS_URLS.split(", ")],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// No Cache

app.use(noCache());

// Helmet

app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// Directories

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));

// Logger

app.use(logger('dev'));

// Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parser

app.use(cookieParser());

// Flash

app.use(flash());

// CSRF

app.use(csrf());

// Set Cookies

app.use((req, res, next) => {
    res.locals.csrftoken = req.csrfToken();
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.team = req.cookies.team; 
    res.locals.teamArr = req.cookies.teamArr; 
    res.locals.currentPath = req.path;
    next();
});

// Promisfy

app.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
});

// Route Handling

app.use('/', routes);

// Module Exports

module.exports = app;