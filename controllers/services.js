import express from 'express'
import ServiceType from '../models/serviceTypes.js'
import User  from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'

//Define the router
const router = express.Router()

//Index Page, Get
router.get('', async (req, res) =>{
    const pets = await Pet.find()
    res.render('pets/index.ejs', {pets})
})

//New Pet, GET
router.get('/new', async (req, res) => {
    res.render('pets/new.ejs')
})

//Add the Pet to the database, POST
router.post('', isSignedIn, async (req, res)=>{
    const userId = req.session.user._id
    console.log (`The userid is ${userId}`)
    req.body.owner = req.session.user._id
    
    
    const newPet = await Pet.create(req.body)
    
    //Update the user to include the pet
    await User.findByIdAndUpdate(userId, {$push: {pets:newPet._id}})
    res.redirect(`/users/${userId}`)
})


//Export the router
export default router