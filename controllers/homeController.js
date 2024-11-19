// Creating controller for homepage

// Rendering homepage
exports.homepage = (req, res, next) => {
    res.render('homepage');
}

// Creating logging functions when user tries to route into any page
exports.logRequest = (req, res, next) => {
    console.log(`Request received for ${req.url}`);
    next();
}