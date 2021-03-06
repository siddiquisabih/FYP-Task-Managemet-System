const mongoose = require("mongoose")
const Schema = mongoose.Schema



const authSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
})

const auth = mongoose.model("Authentication", authSchema)

module.exports = auth