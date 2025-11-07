import express from 'express'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'
import bcrypt from 'bcrypt'
import ServiceType from '../models/serviceTypes.js'

//Define the router
const router = express.Router()

//Index Page, GET
//Has replaced the 'show minders'
router.get('/',  async (req, res) => {
    const allUsers = await User.find()
    res.render('users/index.ejs', { allUsers })
})

//Show Page, GET
router.get('/:userId', async (req, res) => {

    const viewUser = await User.findById(req.params.userId)    
    
    console.log('The equals function returns: ', viewUser.equals(req.session.user))

    const fullUser = await User.findById(viewUser)
        .populate('pets')
        .populate('services')
    res.render('users/show.ejs', { viewUser: fullUser })
})

//Go to the edit form
router.get('/:userId/edit', isSignedIn, async (req, res) => {
    const fullUser = await User.findById(req.session.user._id)
    console.log ('the fullUser is', fullUser)
    res.render('users/edit.ejs', {user:fullUser})
})

//Update
//This route makes user changes to the data base
router.put('/:userId', isSignedIn, async (req, res) => {
    const userId = req.params.userId
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    
    console.log('the req.body is ,',req.body)
     console.log('the session user is, ',req.session.user)
     console.log('the session user email is ', req.session.user.email)

        const currentUser = await User.findById(userId)
        
        //Check if the user has changed and is free
        const existingUser = await User.findOne({ username: username })
        if (existingUser && existingUser.username != username) {
            req.session.message = `The username ${username} is not available. Please chose another one!`
            return res.redirect(`/users/${userId}`)
        }

        //Check if the email is free
        const existingEmail = await User.findOne({ email: email })
        if (existingEmail && existingEmail.email != email) {
            req.session.message = `The email ${email} is already registered. Please select an alternative email!`
            return res.redirect(`/users/${userId}`)
        }

        //If the password field is empty, then keep the same hushed password
        if (req.body.password === '') {
            req.body.password = currentUser.password
        } else if (password != confirmPassword) {
            req.session.message = `The passwords do not match`
            return res.redirect(`/users/${userId}`)
        } else {
            req.body.password = bcrypt.hashSync(password, 12)
        }
        //Update the database
        const user = await User.findByIdAndUpdate(userId, req.body)
        //Update the session cookie, to ensure the changes are capures
        req.session.user.username = username
        
        req.session.message = `Your details have succesfully been updated: 
        <br> New username:  ${username}
        <br> New email:  ${email}`
        return res.redirect(`/users/${userId}`)

})

//Go to the view Pets page
router.get('/:userId/pets', isSignedIn, async (req, res) => {
    const userId = req.params.userId
    const fullUser = await User.findById(userId).populate('pets')
    res.render('users/pets.ejs', { user: fullUser })
})

//Export the router
export default router