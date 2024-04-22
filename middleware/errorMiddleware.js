exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.errorHandler = (err, req, res, next) => {
    // Jika status tidak dimasukkan
    let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.errors || err.name === "SequelizeValidationError") {
        message = err.errors.map((err) => ({
            [err.path]: err.message,
        }));
        statusCode = 400;
    }

    res.status(statusCode).json({
        error: message,
        stack: err.stack,
    });
};