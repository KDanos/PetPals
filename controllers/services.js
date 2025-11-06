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
    const currentUser = req.session.user
    const currentServices = currentUser.services
    const serviceList = await ServiceType.find()
    res.render('services/new.ejs', { serviceList: serviceList, currentServices: currentServices })
})

//Add the new service to the user in database, POST
router.post('', isSignedIn, async (req, res) => {

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


//Export the router
export default router