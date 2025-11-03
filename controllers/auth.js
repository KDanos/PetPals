import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'


//Define the router
const router = express.Router()

//Sign-up page 
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

//Create a new user
router.post('/', async (req, res) => {
    const newUser = req.body
    const username = newUser.username
    const email = newUser.email
    const password = newUser.password
    const confirmPassword = newUser.confirmPassword
    req.body.isMinder = !!req.body.isMinder
    req.body.hasPets  =!!req.body.hasPets 
    try {
        //Check if the passwords match
        if (password != confirmPassword) {
            req.session.message = `The passwords do not match`
            return res.redirect('/auth/sign-up')
        }
        //Check if the user name is free
        const existingUser = await User.findOne({ username: username })
        if (existingUser) {
            req.session.message = `The username ${username} is not available. Please chose another one!`
            return res.redirect('/auth/sign-up')
        }

        //Check if the email is free
        const existingEmail = await User.findOne({ email: email })
        if (existingEmail) {
            req.session.message = `The email ${email} is already registered. Please select an alternative email!`
            return res.redirect('/auth/sign-up')
        }

        //Hash the password
        req.body.password = bcrypt.hashSync(password, 12)
        console.log(`The hash password is ${req.body.password}. The original value was ${password}`)

        // Add the new user to the database
        const createdUser = await User.create(req.body)
        req.session.message = `Registration was successful. Welcome to the club ${username}`
        res.redirect('auth/sign-in', {username:username, password: password })
    }
    catch (error) {
        console.error(error)
        req.session.message = `Something went wrong during sign-up. Please try again later`
        return res.redirect('/auth/sign-up')
    }
})

//Sign-in page-Go to, GET
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})

//Sign-in a user, POST
router.post('/sign-in', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(`User ${username} is attempting to sign-in`)
    try {
        //Verify user exists in the database
        const existingUser = await User.findOne({ username: username })
        if (!existingUser) {
            req.session.message = `The user ${username} account has not been found`
            return res.redirect('/auth/sign-in')
        }

        //Veriy that the password is correct
        const comparePasswords = bcrypt.compareSync(password, existingUser.password)
        if (!comparePasswords) {
            req.session.message = `The password provided does not match the username`
            return res.redirect('/auth/sign-in')
        }

        //Log-in
        //First we update the session store  
        req.session.user = {
            _id: existingUser.id,
            username: existingUser.username
        }
        //Then we save the new session and redirect to the landing page 
        req.session.save(() => res.redirect('/'))

    } catch (error) {
        console.log('Something went wrong during sign-in')
        req.session.message = `Something went wrong during the sign-in process. Please try again later`
        res.redirect('/auth/sign-in')
    }
})

//Sign-out a user
router.get('/sign-out', isSignedIn, (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

//export the router
export default router