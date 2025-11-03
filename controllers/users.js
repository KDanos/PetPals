import express from 'express'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'

//Define the router
const router = express.Router()

//Index Page, GET
router.get ('', isSignedIn, async  (req, res) =>{
    const users =  await User.find()
    res.render('users/index.ejs', {users})
})

//Export the router
export default router