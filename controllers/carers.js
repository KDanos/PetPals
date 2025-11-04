import express from 'express'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'

//Define the router

const router = express.Router()

//Index Page, GET
router.get('', isSignedIn, async (req, res) =>{
    const carers = await User.find({isMinder: true})
    // res.send('lets have a look at all our carers')
    res.render('carers/index.ejs', {carers})
})

//Export the router
export default router