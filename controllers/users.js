import express from 'express'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'
import bcrypt from 'bcrypt'
import ServiceType from '../models/serviceTypes.js'

//Define the router
const router = express.Router()

//Index Page, GET
//Show a list of all the users-might not be enabled on the final form
router.get('', isSignedIn, async (req, res) => {
    const users = await User.find()
    res.render('users/index.ejs', { users })
})

//Show Page, GET
router.get('/:userID', isSignedIn, async (req, res) => {
    const currentUser = req.session.user
    const fullUser = await User.findById(currentUser._id).populate('pets')
    res.render('users/view.ejs', { user: fullUser })
})

//Go to the edit form
router.get('/:userId/edit', isSignedIn, async(req, res) => {
    res.render('users/edit.ejs')
})

//Update
//This route makes user changes to the data base
router.put('/:userId/edit', isSignedIn, async (req, res) => {
    const userId = req.params.userId
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    try {
        const currentUser = await User.findById(userId)

        //Check if the user has changed and is free
        const existingUser = await User.findOne({ username: username })
        if (existingUser && existingUser.username != username) {
            req.session.message = `The username ${username} is not available. Please chose another one!`
            return res.redirect(`/users/${userId}`)
        }

        //Check if the email is free
        const existingEmail = await User.findOne({ email: email })
        if (existingEmail && existingUser.email != email) {
            req.session.message = `The email ${email} is already registered. Please select an alternative email!`
            return res.redirect(`/users/${userId}`)
        }

        //If the password field is empty, then keep the same hushed password
        if (req.body.password === '') {
            console.log('theere is no entry for password')
            console.log('the user is, ', currentUser)
            req.body.password = currentUser.password
        } else if (password != confirmPassword) {
            req.session.message = `The passwords do not match`
            return res.redirect(`/users/${userId}`)
        } else {
            req.body.password = bcrypt.hashSync(password, 12)
        }

        const user = await User.findByIdAndUpdate(userId, req.body)
        console.log('The updated details are ', user)
        req.session.message = `Your detials have succesfully been updated: 
        <br> New username:  ${username}
        <br> New email:  ${email}`
        return res.redirect(`/users/${userId}`)

    } catch (error) {
        console.error(error)
        req.session.message = `Something went wrong when updating the user information. Please try again`
        return res.redirect(`/users/${userId}`)
    }
})

//Go to the view Pets page
router.get('/:userId/pets', isSignedIn, async (req, res) => {
    
    const userId = req.params.userId
    const fullUser = await User.findById(userId).populate('pets')
    
    // res.send('you are correctly working the view pets profile button')
    res.render('users/pets.ejs', {user:fullUser})
})

//Export the router
export default router