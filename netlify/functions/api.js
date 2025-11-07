import serverless from 'serverless-http'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import fs from 'fs'
import path from 'path'
import URL from 'url'
import methodOverride from 'method-override'

import authRouter from '../../controllers/auth.js'
import userRouter from '../../controllers/users.js'
import petRouter from '../../controllers/pets.js'
import serviceRouter from '../../controllers/services.js'

import passUserToView from '../../middleware/pass-user-to-view.js'
import passMessageToView from '../../middleware/pass-message-to-view.js'



//Import the image
const landingPageImages = [
    'https://res.cloudinary.com/dxmbdwavt/image/upload/v1762520157/Great_Dane_in_Pool_lzqwtz.jpg',
    'https://res.cloudinary.com/dxmbdwavt/image/upload/v1762520156/Goldfish_bbia2w.jpg,'
]



//Create the app
const app = express()

//Middleware
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, 
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI})
}))
app.use(methodOverride('_method'))
//Custom made middleware
app.use(passUserToView)
app.use(passMessageToView)


//Assign routers
app.use ('/auth', authRouter)
app.use ('/users', userRouter)
app.use('/pets', petRouter)
app.use('/services', serviceRouter)
//Routes

//Create a landing page
app.get('/', (req,res)=>{
   res.render('index.ejs', {photosArray:landingPageImages })
})

//connections
const connect = async ()=>{
    const activePort = (process.env.PORT) ? process.env.PORT : 3000
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log ('We have succesfully connected to the database')
        
    } catch {
        console.log('We have failed to connect to the database')
    }
}

connect()


export const handler = serverless(app)