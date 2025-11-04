import express from 'express'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'

//Define the router
const router = express.Router()

//Index Page, GET
router.get('', isSignedIn, async (req, res) => {
    const users = await User.find()
    res.render('users/index.ejs', { users })
})

//Show Page, GET
router.get('/:userID', isSignedIn, async (req, res) => {
    const currentUser = req.session.user
    const fullUser = await User.findById(currentUser._id)
    console.log('The current user is:', currentUser)
    console.log('The fullUser is:', fullUser)

    res.render('users/show.ejs',{user:fullUser})
})

//Export the router
export default router