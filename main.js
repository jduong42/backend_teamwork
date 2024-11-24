// Importing necessary modules
const express = require('express');
const layout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const { json } = require('express');
const homeController = require('./controllers/homeController');
const usersController = require('./controllers/usersController');
const errorController = require('./controllers/errorController');

// Setting up the application to use imported modules
const app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(layout);
app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(express.static('public'));

// Setting up session and flash middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true ,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
}));
app.use(flash());

// Code for handing flash messages
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Code for custom middlewares
app.use(homeController.logRequest);

// Code for using user sessions
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Code for login page
app.get('/login', usersController.showLoginPage);
app.post('/login', usersController.login);
app.get('/login/new', usersController.showCreateUserPage);
app.post('/login/new', usersController.createUser);

// Code for handing log out
app.post('/ajax-logout', usersController.ajaxLogout);

// Code for user registration
app.post('/register', usersController.registerUser);

// Code for homepage
app.get('/', (req, res) => {
    res.render('homepage', { title: 'Home', success_msg: req.flash('success_msg'), error_msg: req.flash('error_msg') });
});

// Code for contact page
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us', message: req.flash('success') });
});

app.post('/contact', (req, res) => {
    // Handle form submission
    const { name, email, message } = req.body;
    console.log(`Received contact form submission: ${name}, ${email}, ${message}`);
    req.flash('success', 'Your message has been sent successfully!');
    res.redirect('/contact');
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Internal Server Error' });
});

// Code for starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on http://localhost:${app.get('port')}`);
});