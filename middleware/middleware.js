const isUserAuthenticated = (req, res, next) => {
    if (req.originalUrl == '/cities' || req.originalUrl == '/signup' || req.originalUrl == '/login') {
        next()
    }
    else if (req.headers.cookie !== undefined && req.headers.cookie !== "") {
        console.log('i am here')
        next()
    }
    else {
        res.send('need to be login')
    }
}

module.exports = (isUserAuthenticated)