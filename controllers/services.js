import express from 'express'
import ServiceType from '../models/serviceTypes.js'
import User from '../models/users.js'
import isSignedIn from '../middleware/is-signed-in.js'
import session from 'express-session'

//Define the router
const router = express.Router()

//Index Page, Get

//New Pet, GET
router.get('/new', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id).populate('services')
    const currentServices = currentUser.services
    const serviceList = await ServiceType.find()
    res.render('services/new.ejs', { serviceList: serviceList, currentServices: currentServices })
})

//Add the new service to the user in database, POST
router.post('', isSignedIn, async (req, res) => {

    try {

    } catch (error) {

    }
    const userId = req.session.user._id
    const serviceTypeId = req.body.serviceType
    const serviceType = await ServiceType.findById(serviceTypeId)

    if (!ServiceType) {
        req.session.message = 'Service not found'
        return res.redirect('services/new')
    }

    //Update the user to include the new service
    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { services: serviceTypeId } })

    req.session.message = `Your have succesfully added a new service: 
    <br>${serviceType.name}`

    res.redirect(`/users/${userId}`)
})

//Render the form to delete a service
router.get('/:userId/delete', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id).populate('services')
    const currentServices = currentUser.services

    res.render('services/delete.ejs', { currentServices })
})

//Delete a service from a user in the database
router.get('/:userId/:serviceId/delete', isSignedIn, async (req, res) => {

    const userId = req.params.userId
    const serviceId = req.params.serviceId
    try {
        await User.findByIdAndUpdate(userId, { $pull: { services: serviceId } })
        console.log('the ServiceType is: ',ServiceType)
        req.session.message = `${ServiceType.serviceId} has succesfully been deleted from your profile`
        res.redirect(`/users/${userId}`)
    } catch (error) {

    }

})
//Export the router
export default router