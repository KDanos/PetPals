import express from 'express'
import Pet from '../models/pets.js'
import isSignedIn from '../middleware/is-signed-in.js'

//Define the router
const router = express.Router()

//Index Page, Get
router.get('', async (req, res) =>{
    const pets = await Pet.find()
    res.render('pets/index.ejs', {pets})
})

//Export the router
export default router