const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, type: String },
    phoneNumber: { required: true, type: String },
    homeAddress: { required: true, type: String }
}, { timestamps: true })

module.exports = mongoose.model('Patient', userModel)