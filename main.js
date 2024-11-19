// Importing necessary modules
const express = require('express');
const layout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const { json } = require('express');
const homeController = require('./controllers/homeController');
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
    saveUninitialized: true
}));
app.use(flash());

// Code for custom middlewares
app.use(homeController.logRequest);

// Code for routes
app.get('/', (req, res) => {
    res.render('homepage', { title: 'Home' });
});

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