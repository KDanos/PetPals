import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   animal: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    minder: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    intro: {type: String},
    postCode: {type:String},
})

const Pet = mongoose.model('Pet', petSchema)

export default Pet