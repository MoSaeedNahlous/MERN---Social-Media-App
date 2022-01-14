//to override the default error handler you should pass err, first with req,res,next
const errorHandler = (err, req, res, next) => {
    //sometimes we get a 200 as an error so...
    // if error with code 200 then change to 500 or keep it as it
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    switch (err.message) {
        //JWT TOKEN ERRORS
        //case the token is wrong or wrong structured
        case "invalid signature":
        case "jwt malformed":
        case "invalid token":
            err.message='Auth Error...'
            break;
        //case the token is expired
        case "jwt expired":
            err.message = 'Session Expired...'
            break;
        //LOGIN ERRORS
        //already handled in the login function

        //REGISTER
        //already handled in the login function


    }
    res.status(statusCode).json({
        message: err.message,
        // //as long as we are in development we will show stack
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}



// if we go to unknown route
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}



module.exports = {errorHandler,notFound}