import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isMinder: {
        type: Boolean,
        required: true,
        default: false
    },
    hasPets: {
        type: Boolean,
        required: true,
        default: false
    },
    pets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Pet'
    },
    services: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Service'
    },

    intro: { type: String },
    postCode: { type: String },
})

const User = mongoose.model('User', userSchema)

export default User