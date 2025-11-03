//Protect routes by ensuring access only if the user is signed in. 
const isSignedIn = (req, res, next) =>{
    if (req.session.user) return next()
//if not signed in, then redirect the user, the user is redirected to the sign-in page
    res.redirect('/auth/sign-in')
}

export default isSignedIn