const isUserAuthenticated=(req,res,next)=>{
    if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
        next()
    }
    else{
        res.send('need to be login')
    }
}

module.exports=(isUserAuthenticated)