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
    pets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Pet',
        default: []
    },
    services: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'ServiceType',
        default: []
    },

    intro: { type: String },
    postCode: { type: String },
})

const User = mongoose.model('User', userSchema)

export default User