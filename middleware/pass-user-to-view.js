//This function will ensure that the locals onbject always has a user object, even if it is undefined
const passUserToView = (req, res, next) =>{
    res.locals.user = req.session.user
    next()
}

export default passUserToView