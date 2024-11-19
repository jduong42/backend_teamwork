const httpStatus = require('http-status-codes');

exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
}

exports.respondNoResourceFound = (req, res) => {
    var errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render('404');
};

exports.respondInternalError = (error, req, res, next) => {
    var errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.render('500');
}

exports.pageNotFound = (req, res) => {
    res.status(404);
    res.render("404");
};

exports.internalServerError = (err, req, res, next) => {
    res.status(500);
    res.render("500");
};