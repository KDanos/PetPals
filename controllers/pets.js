import express from 'express'
import Pet from '../models/pets.js'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'

//Define the router
const router = express.Router()

//Index Page, Get
router.get('', async (req, res) => {
    const pets = await Pet.find()
    res.render('pets/index.ejs', { pets })
})

//New Pet, GET
router.get('/new', async (req, res) => {
    res.render('pets/new.ejs')
})

//Add the Pet to the database, POST
router.post('', isSignedIn, async (req, res) => {
    const userId = req.session.user._id
    req.body.owner = req.session.user._id

    const newPet = await Pet.create(req.body)

    //Update the user to include the pet
    await User.findByIdAndUpdate(userId, { $push: { pets: newPet._id } })

    req.session.message = `Your have succesfully added a new pet: 
    <br> Name:  ${newPet.name}
    <br> Animal:  ${newPet.animal}`
    res.redirect(`/users/${userId}`)
})

//Render the form to edit the details of a pet
router.get('/:petId/edit', async (req, res) => {
    const pet = await Pet.findById(req.params.petId)
    res.render('pets/edit.ejs', { pet })
})

//Make the changes to the datebase
router.put('/:petId', async (req, res) => {

    const newName = req.body.name
    const newAnimal = req.body.animal
    const newPet = await Pet.findByIdAndUpdate(req.params.petId, req.body)

    req.session.message = `Your have changed the pet details: 
    <br> Nname:  ${newPet.name}
    <br> Animal:  ${newPet.animal}`
    res.redirect(`/pets/${req.params.petId}`)
})

//View the profile of a single pet
router.get('/:petId', async (req, res) => {
    const pet = await Pet.findById(req.params.petId)
    res.render('pets/view.ejs', { pet })
})



//Export the router
export default router